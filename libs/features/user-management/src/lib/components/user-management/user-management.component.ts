import { AuthStore } from '@access-control-panel/authentication';
import { ConfirmationDialogComponent } from '@access-control-panel/ui';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user-management.model';
import { UserStore } from '../../store/user.store';
import { UserManagementListComponent } from '../user-management-list/user-management-list.component';
import { UserModalComponent } from '../user-modal/user-modal.component';

export const DELETE_USER_DIALOG = {
  width: '350px',
  message: (username: string) => `Are you sure you want to delete user "${username}"?`,
  buttons: {
    confirm: 'Delete',
    cancel: 'Cancel'
  }
};

/**
 * @description
 * This is the main component for the User Management feature.
 * It orchestrates user listing, creation, editing, and deletion,
 * interacting with the UserStore and opening various dialogs.
 */

@Component({
  selector: 'lib-user-management',
  imports: [ CommonModule,
    MatIconModule,
    MatDialogModule,
    UserManagementListComponent,
    MatButtonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {

  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  userStore = inject(UserStore);
  public readonly authStore = inject(AuthStore);
  readonly users: Signal<User[]> = this.userStore.users;

 ngOnInit() {
  this.userStore.loadUsers();
}

  onCreateUser(): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '450px',
      height: '550px',
      data: { isEditMode: false },
    });
    dialogRef.afterClosed()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe();
  }

   onEditUser(user: User): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '450px',
      height: '450px',
      data: { user: user, isEditMode: true },
    });
  }


  onDeleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: DELETE_USER_DIALOG.width,
      data: {
        message: DELETE_USER_DIALOG.message(user.username),
        buttonText: {
          ok: DELETE_USER_DIALOG.buttons.confirm,
          cancel: DELETE_USER_DIALOG.buttons.cancel
        }
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.userStore.deleteUser(user.id, user.username).subscribe();
        }
      });
  }

}
