import { User } from '@access-control-panel/user-management';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, map, of, pipe, switchMap, tap } from 'rxjs';
import { LoginCredentials, USER_ROLES } from '../models/auth.model';
import { AuthService } from './auth.service';
import { Role, RoleManagementService } from '@access-control-panel/role-management';


export interface AuthState {
  user: User | null;
  userRole: Role | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  userRole: null,
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
  withMethods((state, authService = inject(AuthService),roleService=inject(RoleManagementService) ,router = inject(Router)) => ({
     login: rxMethod<LoginCredentials>(
      pipe(
        tap(() => patchState(state, { isLoading: true, error: null })),
        switchMap((credentials) =>
          authService.login(credentials).pipe(
            switchMap(({ user, token }) => {
              if (user.roleId) {
                return roleService.getRoleById(user.roleId).pipe(
                  map(role => ({ user, token, role })),
                  catchError(roleError => {
                    return of({ user, token, role: null });
                  })
                );
              } else {
                return of({ user, token, role: null });
              }
            }),
            tap(({ user, token, role }) => {
              patchState(state, {
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
                userRole: role
              });
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
     hasPermission(permissionId: string): boolean {
      const role = state.userRole();
      return role ? role.permissions.some(p => p.id === permissionId) : false;
    },
  }))
);