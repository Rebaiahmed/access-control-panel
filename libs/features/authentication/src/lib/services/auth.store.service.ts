import { User } from '@access-control-panel/user-management';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { LoginCredentials, USER_ROLES } from '../models/auth.model';
import { AuthService } from './auth.service';


export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};


export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    currentUser: computed(() => state.user()),
    authenticated: computed(() => state.isAuthenticated()),
    isSuperAdmin: computed(() => state.user()?.isSuperAdmin || false),
  })),
  withMethods((state, authService = inject(AuthService),router = inject(Router)) => ({
    login: rxMethod<LoginCredentials>(
      pipe(
        tap(() => patchState(state, { isLoading: true, error: null })),
        switchMap((credentials) => 
          authService.login(credentials).pipe(
            tap(({ user, token }) => {
              patchState(state, {
                user,
                token,
                isAuthenticated: true,
                isLoading: false
              });
              
              // Store token in localStorage
              authService.saveToken(token);
              router.navigate(['/home']);
            }),
            catchError((error) => {
              patchState(state, { 
                error: error.message || 'Login failed',
                isLoading: false 
              });
              return EMPTY;
            })
          )
        )
      )
    ),
    logout() {
      authService.logout();
      patchState(state, initialState);
    },
  }))
);