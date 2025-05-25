import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';
import { RoleManagementService } from '../services/role-management.service';

/**
 * @description
 * Async validator to check if a role name is unique.
 * It debounces the check and allows ignoring the original name during edits.
 */

export function uniqueRoleNameValidator(
   roleService: RoleManagementService,
  originalRoleId?: string
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }
    return timer(500).pipe(
      switchMap(() =>
        roleService.checkRoleNameExists(control.value, originalRoleId).pipe(
          map(exists => {
            return exists ? { nonUniqueName: true } : null;
          }),
          catchError(() => of(null))
        )
      )
    );
  };
}