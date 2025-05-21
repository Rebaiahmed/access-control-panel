import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { inject } from '@angular/core';
import { map, Observable, of, switchMap, timer } from 'rxjs';
import { UserManagementService } from '../services/user-management.service'; // Adjust path // Adjust path
import { User } from '../models/user-management.model';

export function uniqueUsernameValidator(
  isEditMode: boolean,
  originalUsername?: string
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    if (isEditMode && control.value.toLowerCase() === originalUsername?.toLowerCase()) {
      return of(null);
    }

    const userService = inject(UserManagementService);

    return timer(500).pipe(
      switchMap(() => userService.getAllUsers().pipe(
        map((users: User[]) => {
          const found = users.some(user => user.username.toLowerCase() === control.value.toLowerCase());
          return found ? { uniqueUsername: true } : null;
        })
      ))
    );
  };
}