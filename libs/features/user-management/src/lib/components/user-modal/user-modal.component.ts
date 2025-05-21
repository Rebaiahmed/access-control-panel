import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { uniqueUsernameValidator } from '../../utils/unique-username-validator';
import { ToastService } from '@access-control-panel/core';
import { UserManagementService } from '../../services/user-management.service';
import { UserStore } from '../../store/user.store';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models/user-management.model';

@Component({
  selector: 'lib-user-modal',
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss',
})
export class UserModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UserModalComponent>);
  private userService = inject(UserManagementService);
  private userStore = inject(UserStore);
  private toastService = inject(ToastService);

  userForm!: FormGroup;
  isEditMode = false;
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user?: User; isEditMode: boolean }
  ) {
    this.isEditMode = data.isEditMode;
    this.title = this.isEditMode ? 'Edit User' : 'Create New User';
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      username: [
        { value: this.data.user?.username || '', disabled: this.isEditMode },
        [Validators.required, Validators.minLength(3)],
        [uniqueUsernameValidator(this.isEditMode, this.data.user?.username)],
      ],
      password: [
        '',
        this.isEditMode ? [] : [Validators.required, Validators.minLength(6)],
      ],
      fullName: [
        this.data.user?.fullName || '',
        [Validators.required, Validators.minLength(3)],
      ],
    });

    if (this.isEditMode) {
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  private handleCreateUser(userPayload: Partial<User>): void {
    const newUser: User = {
      id: '',
      ...userPayload,
    } as User;
    this.userStore
      .createUser(newUser)
      .subscribe(() => this.dialogRef.close(true));
  }

  private handleUpdateUser(userPayload: Partial<User>): void {
    const updatedUser: User = {
      ...this.data.user!,
      ...userPayload,
      username: this.data.user!.username,
    };
    this.userStore
      .updateUser(this.data.user!.id, updatedUser)
      .subscribe(() => this.dialogRef.close(true));
  }

  onSaveUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const userPayload: Partial<User> = {
      username: this.userForm.get('username')?.value,
      fullName: this.userForm.get('fullName')?.value,
      ...(this.userForm.get('password')?.value && {
        password: this.userForm.get('password')?.value,
      }),
    };

    if (this.isEditMode && this.data.user) {
      this.handleUpdateUser(userPayload);
    } else {
      this.handleCreateUser(userPayload);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
