import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { User } from '../models/user-management.model';
import { UserManagementService } from '../services/user-management.service';
import { ToastService } from '@access-control-panel/core';


export interface UserState {
  users: User[];
  isLoading: boolean;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    totalUsers: computed(() => state.users().length),
  })),
  withMethods((state, userService = inject(UserManagementService), toastService = inject(ToastService)) => ({

    loadUsers: rxMethod<void>(
      pipe(
        tap(() => patchState(state, { isLoading: true })),
        switchMap(() =>
          userService.getAllUsers().pipe(
            tap((users) => patchState(state, { users, isLoading: false })),
          )
        ),
      )
    ),

    createUser(user: Omit<User, 'id'>) {
      return userService.createUser(user).pipe(
        tap((newUser) => {
           patchState(state, (s) => ({ users: [...s.users, newUser] }));
          toastService.success(`User '${newUser.username}' created successfully!`);
        }),
      );
    },

    updateUser(id: string, user: User) {
      return userService.updateUser(id, user).pipe(
        tap((updatedUser) => {
         patchState(state, (s) => ({
            users: s.users.map((u: User) => (u.id === updatedUser.id ? updatedUser : u)),
          }));
          toastService.success(`User '${updatedUser.username}' updated successfully!`);
        }),
      );
    },

    deleteUser(id: string, username: string) {
      return userService.deleteUser(id).pipe(
        tap(() => {
        patchState(state, (s) => ({
            users: s.users.filter((u: User) => u.id !== id),
          }));
          toastService.success(`User '${username}' deleted successfully!`);
        }),
      );
    },
  })),
);