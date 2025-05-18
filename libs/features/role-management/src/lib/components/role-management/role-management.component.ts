import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleManagementService } from '../../services/role-management.service';
import { RoleStore } from '../../store/role.store';
import { RoleModalComponent } from '../role-modal/role-modal.component';
import { Role } from '../../models/role-management';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RolesListComponent } from '../roles-list/roles-list.component';

@Component({
  selector: 'lib-role-management',
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    RolesListComponent
],
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.css',
})
export class RoleManagementComponent {
  private roleService = inject(RoleManagementService);
  private dialog = inject(MatDialog);
  roleStore = inject(RoleStore);
  roles = this.roleStore.roles;

  onCreateRole(): void {
    const dialogRef = this.dialog.open(RoleModalComponent, {
      width: '500px',
      // Pass data to the modal to indicate it's in creation mode
      data: { isEditMode: false },
    });
    dialogRef.afterClosed().subscribe((actionWasSuccessful: boolean) => {
      if (actionWasSuccessful) {
        // The RoleStore's createRole method already updates the 'roles' signal,
        // so no manual reload needed here. The view will automatically reflect changes.
      }
    });
  }

  onEditRole(role: Role): void {
    const dialogRef = this.dialog.open(RoleModalComponent, {
      width: '500px',
      // Pass the role data and indicate edit mode
      data: { role: role, isEditMode: true },
    });
  }

  onDeleteRole(role: Role): void {
    if (!role.id) {
      // this.snackBar.open('Cannot delete role: Role ID is missing.', 'Close', { duration: 3000 });
      return;
    }
  /*   this.dialogRef.afterClosed().subscribe((actionWasSuccessful: boolean) => {
      if (actionWasSuccessful) {
        // The RoleStore's updateRole method already updates the 'roles' signal.
      }
    }); */
  }
}
