import { ToastService } from '@access-control-panel/core';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, Observable, pipe, switchMap, tap, throwError } from 'rxjs';
import { Role } from '../models/role-management';
import { RoleManagementService } from '../services/role-management.service';

export interface RoleState {
  roles: Role[];
  isLoading: boolean;
}

const initialState: RoleState = {
  roles: [],
  isLoading: false,
};

export const RoleStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    totalRoles: computed(() => state.roles().length),
  })),
  withMethods((state, roleService = inject(RoleManagementService), toastService = inject(ToastService)) => ({

    loadRoles: rxMethod<void>(
      pipe(
        tap(() => patchState(state, { isLoading: true })),
        switchMap(() =>
          roleService.getRoles().pipe(
            tap((roles) => patchState(state, { roles, isLoading: false })),
          )
        ),
      )
    ),

    createRole(role: Role) {
      return roleService.createRole(role).pipe(
        tap((newRole) => {
           patchState(state, (s) => ({ roles: [...s.roles, newRole] }));
          toastService.success(`Role '${newRole.name}' created successfully!`);
        }),
         catchError((error) => {
          toastService.error(`Failed to create role '${role.name}'. Please try again.`);
          return throwError(() => error);
        })
      );
    },

    updateRole(id: string, role: Role) {
      return roleService.updateRole(id, role).pipe(
        tap((updatedRole) => {
         patchState(state, (s) => ({
            roles: s.roles.map((r: Role) => (r.id === updatedRole.id ? updatedRole : r)),
          }));
          toastService.success(`Role '${updatedRole.name}' updated successfully!`);
        }),
        catchError((error) => {
          toastService.error(`Failed to update role '${role.name}'. Please try again.`);
          return throwError(() => error);
        })
      );
    },

    deleteRole(id: string, roleName: string) {
      return roleService.deleteRole(id).pipe(
        tap(() => {
          patchState(state, (s) => ({
            roles: s.roles.filter((r: Role) => r.id !== id),
          }));
          toastService.success(`Role '${roleName}' deleted successfully!`);
        }),
        catchError((error) => {
          toastService.error(`Failed to delete role '${roleName}'. Please try again.`);
          return throwError(() => error);
        })
      );
    },

    isRoleAssignedToUsers(id: string): Observable<boolean> {
      return roleService.isRoleAssignedToUsers(id);
    },
  })),
);