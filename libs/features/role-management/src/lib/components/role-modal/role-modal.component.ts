import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '@access-control-panel/core';
import { RoleStore } from '../../store/role.store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup } from '@angular/forms';
import { RoleManagementService } from '../../services/role-management.service';

@Component({
  selector: 'lib-role-modal',
  imports: [CommonModule],
  templateUrl: './role-modal.component.html',
  styleUrl: './role-modal.component.scss',
})
export class RoleModalComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<RoleModalComponent>);
  private roleService = inject(RoleManagementService); // Still needed for uniqueRoleNameValidator
  private roleStore = inject(RoleStore); // Inject RoleStore
  private toastService = inject(ToastService); // Inject ToastServic

  roleForm!: FormGroup;
  isEditMode = false;

  onCancel(): void {
    this.dialogRef.close(false); // Close with false on cancel
  }
}
