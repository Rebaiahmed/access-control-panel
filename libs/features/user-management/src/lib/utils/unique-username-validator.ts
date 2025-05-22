import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, Observable, of, switchMap, timer } from 'rxjs';
import { User } from '../models/user-management.model';
import { UserManagementService } from '../services/user-management.service';

export function uniqueUsernameValidator(
  isEditMode: boolean,
  userService: UserManagementService,
  originalUsername?: string,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    if (isEditMode && control.value.toLowerCase() === originalUsername?.toLowerCase()) {
      return of(null);
    }
    return timer(500).pipe(
      switchMap(() => userService.getAllUsers().pipe(
        map((users: User[]) => {
          const found = users.some(user => user.username.toLowerCase() === control.value.toLowerCase());
          return found ? { nonUniqueName: true } : null;
        })
      ))
    );
  };
}