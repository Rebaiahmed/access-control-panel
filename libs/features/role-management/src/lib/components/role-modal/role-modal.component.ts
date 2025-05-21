import { ToastService } from '@access-control-panel/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Permission, Role } from '../../models/role-management';
import { RoleManagementService } from '../../services/role-management.service';
import { RoleStore } from '../../store/role.store';
import { uniqueRoleNameValidator } from '../../utils/custom-validator';

@Component({
  selector: 'lib-role-modal',
   imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ScrollingModule,
  ],
  templateUrl: './role-modal.component.html',
  styleUrl: './role-modal.component.scss',
})
export class RoleModalComponent implements OnInit  {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<RoleModalComponent>);
  private roleService = inject(RoleManagementService);
  private roleStore = inject(RoleStore);

  roleForm!: FormGroup;
  isEditMode = false;
  title: string;
  availablePermissions: Permission[] = this.roleService.getPermissions();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { role?: Role; isEditMode: boolean },
  ) {
    this.isEditMode = data.isEditMode;
    this.title = this.isEditMode ? 'Edit Role' : 'Create New Role';
  }

   onPermissionChange(event: MatCheckboxChange, permissionValue: string): void {
    const currentPermissions = this.roleForm.get('permissions')?.value || [];
    if (event.checked) {
      if (!currentPermissions.includes(permissionValue)) {
        this.roleForm.get('permissions')?.setValue([...currentPermissions, permissionValue]);
      }
    } else {
      this.roleForm.get('permissions')?.setValue(currentPermissions.filter((p: string) => p !== permissionValue));
    }
  }

   ngOnInit(): void {
    this.initForm();
  }
   initForm(): void {
    const roleNameControl = this.isEditMode && this.data.role
      ? { value: this.data.role.name, disabled: true }
      : '';
    if (this.isEditMode && this.data.role) {
      this.roleForm = this.fb.group({
        name: [{ value: this.data.role.name, disabled: true }, Validators.required],
        permissions: [this.data.role.permissions || []]
      });
    } else {
      this.roleForm = this.fb.group({
         name: [
        roleNameControl,
        [Validators.required, Validators.minLength(3)],
        [uniqueRoleNameValidator(this.roleService, this.data.role?.id)]
      ],
        permissions: [[],Validators.required]
      });
    }
  }

 

  isPermissionSelected(permissionValue: string): boolean {
    const currentPermissions = this.roleForm.get('permissions')?.value || [];
    return currentPermissions.includes(permissionValue);
  }


  onSaveRole(): void {
     if (this.roleForm.valid) {
      const newRole: Role = {
        id: this.isEditMode ? this.data.role!.id : crypto.randomUUID(),
        name: this.roleForm.get('name')?.value,
        permissions: this.roleForm.get('permissions')?.value,
      };

      if (this.isEditMode) {
        this.roleStore.updateRole(this.data.role!.id,newRole);
        this.dialogRef.close(newRole);
      } else {
        this.roleStore.createRole(newRole).subscribe();
        this.dialogRef.close(true);
      }
    } else {
      this.dialogRef.close(false);
    }
  }

   onCancel(): void {
    this.dialogRef.close(false);
  }
}
