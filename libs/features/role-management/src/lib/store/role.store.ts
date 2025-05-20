import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Observable, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Role } from '../models/role-management';
import { RoleManagementService } from '../services/role-management.service';
import { ToastService } from '@access-control-panel/core';

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
      );
    },

    isRoleAssignedToUsers(id: number): Observable<boolean> {
      return roleService.isRoleAssignedToUsers(id);
    },
  })),
);