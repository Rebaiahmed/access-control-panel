import { TableAction, TableColumn, TableComponent } from '@access-control-panel/ui';
import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user-management.model';
import { Router } from '@angular/router';
@Component({
  selector: 'lib-user-management-list',
  imports: [CommonModule,TableComponent, MatButtonModule, MatIconModule],
  templateUrl: './user-management-list.component.html',
  styleUrl: './user-management-list.component.scss',
})
export class UserManagementListComponent {
   private router = inject(Router);

users = input.required<User[]>();
  editUser = output<User>();
  deleteUser = output<User>();

  columns: TableColumn<User>[] = [
    {
      columnDef: 'username',
      header: 'Username',
      cell: (user: User) => user.username,
    },
    {
      columnDef: 'fullName',
      header: 'Full Name',
      cell: (user: User) => user.fullName,
    },
  ];

  buttons: TableAction<User>[] = [
    {
        actionId: 'edit',
        icon: 'edit',
        tooltip: 'Edit User',
        color: 'primary',
        disabled: (user: User) => user.isSuperAdmin,
      },
      {
        actionId: 'delete',
        icon: 'delete',
        tooltip: 'Delete User',
        color: 'warn',
        disabled: (user: User) => user.isSuperAdmin,
      },
      {
      actionId: 'view',
      icon: 'visibility',
      tooltip: 'View User Details',
      color: 'accent', 
    },
  ];


   onEditUser(user: User): void {
    this.editUser.emit(user);
  }

  onDeleteUser(user: User): void {
    this.deleteUser.emit(user);
  }

  handleUserTableAction(action: any): void {
    switch (action.actionId) {
      case 'edit':
        this.onEditUser(action.element);
        break;
      case 'delete':
        this.onDeleteUser(action.element);
        break;
      case 'view':
        this.router.navigate(['/users', action.element.id]);
        break; 
      default:
        console.error('Unknown user action:', action.actionId);
    }
  }

}
