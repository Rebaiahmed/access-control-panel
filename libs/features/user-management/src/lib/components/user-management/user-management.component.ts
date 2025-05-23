import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStore } from '../../store/user.store';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { User } from '../../models/user-management.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserManagementService } from '../../services/user-management.service';
import { UserManagementListComponent } from '../user-management-list/user-management-list.component';
import { ConfirmationDialogComponent } from '@access-control-panel/ui';
import { AuthStore } from '@access-control-panel/authentication';

export const DELETE_USER_DIALOG = {
  width: '350px',
  message: (username: string) => `Are you sure you want to delete user "${username}"?`,
  buttons: {
    confirm: 'Delete',
    cancel: 'Cancel'
  }
};
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
