import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '../../models/role-management';
import { RoleManagementService } from '../../services/role-management.service';
import { RoleStore } from '../../store/role.store';
import { RoleModalComponent } from '../role-modal/role-modal.component';
import { RolesListComponent } from '../roles-list/roles-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmationDialogComponent } from '@access-control-panel/ui';

export const DELETE_ROLE_DIALOG = {
  width: '350px',
  message: (roleName: string) => `Are you sure you want to delete role "${roleName}"?`,
  buttons: {
    confirm: 'Delete',
    cancel: 'Cancel'
  }
};

@Component({
  selector: 'lib-role-management',
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    RolesListComponent,
    MatButtonModule
],
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleManagementComponent implements OnInit {
  private roleService = inject(RoleManagementService);
  private dialog = inject(MatDialog);
   private destroyRef = inject(DestroyRef);
  roleStore = inject(RoleStore);
  roles = this.roleStore.roles;

ngOnInit() {
  this.roleStore.loadRoles();
}

  onCreateRole(): void {
   const dialogRef = this.dialog.open(RoleModalComponent, {
      width: '450px',
      height: '450px',
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
   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: DELETE_ROLE_DIALOG.width,
      data: {
        message: DELETE_ROLE_DIALOG.message(role.name),
        buttonText: {
          ok: DELETE_ROLE_DIALOG.buttons.confirm,
          cancel: DELETE_ROLE_DIALOG.buttons.cancel
        }
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.roleStore.deleteRole(role.id, role.name)
            .pipe(takeUntilDestroyed())
            .subscribe();
        }
      });
  }
  }

