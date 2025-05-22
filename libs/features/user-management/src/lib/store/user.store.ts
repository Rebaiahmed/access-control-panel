import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, throwError } from 'rxjs';
import { User } from '../models/user-management.model';
import { UserManagementService } from '../services/user-management.service';
import { ToastService } from '@access-control-panel/core';

export interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: null,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    totalUsers: computed(() => state.users().length),
  })),
  withMethods(
    (
      state,
      userService = inject(UserManagementService),
      toastService = inject(ToastService)
    ) => ({
      loadUsers: rxMethod<void>(
        pipe(
          tap(() => patchState(state, { isLoading: true, error: null })),
          switchMap(() =>
            userService
              .getAllUsers()
              .pipe(
                tap((users) => patchState(state, { users, isLoading: false })),
                catchError((error) => {
                  patchState(state, {
                    isLoading: false,
                    error: error.message || 'Failed to load users.',
                  });
                  toastService.error('Failed to load users. Please try again.');
                  return throwError(() => error);
                })
              )
          )
        )
      ),

      createUser(user: Omit<User, 'id'>) {
        patchState(state, { isLoading: true, error: null });
        return userService.createUser(user).pipe(
          tap((newUser) => {
            patchState(state, (s) => ({ users: [...s.users, newUser], isLoading: false }));
            toastService.success(
              `User '${newUser.username}' created successfully!`
            );
          }),
          catchError((error) => {
            const errorMessage = `Failed to create user '${user.username}'.`;
            patchState(state, { isLoading: false, error: errorMessage });
            toastService.error(errorMessage + ' Please try again.');
            return throwError(() => error);
          })
        );
      },

      updateUser(id: string, user: User) {
        patchState(state, { isLoading: true, error: null });
        return userService.updateUser(id, user).pipe(
          tap((updatedUser) => {
            patchState(state, (s) => ({
              users: s.users.map((u: User) =>
                u.id === updatedUser.id ? updatedUser : u
              ),
              isLoading: false,
            }));
            toastService.success(
              `User '${updatedUser.username}' updated successfully!`
            );
          }),
          catchError((error) => {
            const errorMessage = `Failed to update user '${user.username}'.`;
            patchState(state, { isLoading: false, error: errorMessage });
            toastService.error(errorMessage + ' Please try again.');
            return throwError(() => error);
          })
        );
      },

      deleteUser(id: string, username: string) {
        patchState(state, { isLoading: true, error: null });
        return userService.deleteUser(id).pipe(
          tap(() => {
            patchState(state, (s) => ({
              users: s.users.filter((u: User) => u.id !== id),
              isLoading: false,
            }));
            toastService.success(`User '${username}' deleted successfully!`);
          }),
          catchError((error) => {
            const errorMessage = `Failed to delete user '${username}'.`;
            patchState(state, { isLoading: false, error: errorMessage });
            toastService.error(errorMessage + ' Please try again.');
            return throwError(() => error);
          })
        );
      },
    })
  )
);