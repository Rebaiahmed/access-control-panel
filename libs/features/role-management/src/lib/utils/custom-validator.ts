import { FormControl, ValidationErrors } from '@angular/forms';

export function uniqueRoleNameValidator(isEditMode: boolean) {
  return (control: FormControl): ValidationErrors | null => {
    if (isEditMode) {
      return null;
    }
    const existingRoles = (window as any).existingRoles || [];
    if (existingRoles.includes(control.value)) {
      return { nonUniqueName: true };
    }
    return null;
  };
}