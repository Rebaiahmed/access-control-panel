import { RoleStore } from '@access-control-panel/role-management';
import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../models/user-management.model';
import { UserManagementService } from '../../services/user-management.service';
import { UserStore } from '../../store/user.store';
import { uniqueUsernameValidator } from '../../utils/unique-username-validator';

@Component({
  selector: 'lib-user-modal',
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss',
})
export class UserModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UserModalComponent>);
  private userService = inject(UserManagementService);
  private userStore = inject(UserStore);
  private roleStore = inject(RoleStore);

  userForm!: FormGroup;
  isEditMode = false;
  title: string;
  availableRoles = this.roleStore.roles;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user?: User; isEditMode: boolean }
  ) {
    this.isEditMode = data.isEditMode;
    this.title = this.isEditMode ? 'Edit User' : 'Create New User';
  }

  ngOnInit(): void {
    this.initForm();
    this.roleStore.loadRoles();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      username: [
        { value: this.data.user?.username || '', disabled: this.isEditMode },
        [Validators.required, Validators.minLength(3)],
        [uniqueUsernameValidator(this.isEditMode,this.userService, this.data.user?.username)],
      ],
       password: [
        this.data.user?.password || '',
        this.isEditMode ? [] : [Validators.required, Validators.minLength(3)],
      ],
      fullName: [
        this.data.user?.fullName || '',
        [Validators.minLength(3)],
      ],
       roleId: [
        this.data.user?.roleId || '',
        [Validators.required]
      ]
    });
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
      id: this.isEditMode ? this.data.user!.id : crypto.randomUUID(),
      username: this.userForm.get('username')?.value,
      fullName: this.userForm.get('fullName')?.value,
      roleId: this.userForm.get('roleId')?.value,
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
