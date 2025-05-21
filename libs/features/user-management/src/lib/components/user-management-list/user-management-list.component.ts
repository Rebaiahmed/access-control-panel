import { TableAction, TableColumn, TableComponent } from '@access-control-panel/ui';
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user-management.model';
@Component({
  selector: 'lib-user-management-list',
  imports: [CommonModule,TableComponent, MatButtonModule, MatIconModule],
  templateUrl: './user-management-list.component.html',
  styleUrl: './user-management-list.component.scss',
})
export class UserManagementListComponent {

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
      },
      {
        actionId: 'delete',
        icon: 'delete',
        tooltip: 'Delete User',
        color: 'warn',
        disabled: (user: User) => false
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
      default:
        console.error('Unknown user action:', action.actionId);
    }
  }

}
