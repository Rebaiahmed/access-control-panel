import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, map, pipe, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginCredentials, LoginResponse } from '../models/auth.model';
import { User } from '@access-control-panel/user-management';


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
    isSuperAdmin: computed(() => state.user()?.role === 'superadmin'),
    isAdmin: computed(() => ['admin', 'superadmin'].includes(state.user()?.role || '')),
  })),
  withMethods((state, authService = inject(AuthService)) => ({
    // Actions
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
      authService.removeToken();
      patchState(state, initialState);
    },
    
   /*  checkAuthStatus: rxMethod<void>(
      pipe(
        tap(() => patchState(state, { isLoading: true })),
        switchMap(() => {
          const token = authService.getToken();
          
          if (!token) {
            patchState(state, { isLoading: false });
            return EMPTY;
          }
          
          return authService.validateToken(token).pipe(
            map((user:User) => {
              patchState(state, {
                user,
                token,
                isAuthenticated: true,
                isLoading: false
              });
            }),
            catchError(() => {
              authService.removeToken();
              patchState(state, initialState);
              return EMPTY;
            })
          );
        })
      )
    ) */
  }))
);