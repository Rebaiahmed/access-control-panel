import { TableAction, TableColumn, TableComponent } from '@access-control-panel/ui';
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '../../models/role-management';

@Component({
  selector: 'lib-roles-list',
  imports: [CommonModule,TableComponent, MatButtonModule, MatIconModule],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss',
})
export class RolesListComponent {

roles = input.required<Role[]>();
  editRole = output<Role>();
  deleteRole = output<Role>();

  columns: TableColumn<Role>[] = [
    {
      columnDef: 'name',
      header: 'Role Name',
      cell: (role: Role) => role.name,
    },
    {
      columnDef: 'permissions',
      header: 'Permissions',
      cell: (role: Role) => role.permissions.map(p => p.name).join(', '),
    },
  ];

  buttons: TableAction<Role>[] = [
    {
        actionId: 'edit',
        icon: 'edit',
        tooltip: 'Edit Role',
        color: 'primary',
      },
      {
        actionId: 'delete',
        icon: 'delete',
        tooltip: 'Delete Role',
        color: 'warn',
      },
  ];


  onEdit(role: Role): void {
    this.editRole.emit(role);
  }

  onDelete(role: Role): void {
    this.deleteRole.emit(role);
  }

  handleRoleTableAction(action: any): void {
    switch (action.actionId) {
      case 'edit':
        this.onEdit(action.element);
        break;
      case 'delete':
        this.onDelete(action.element);
        break;
      default:
        console.error('Unknown action:', action.actionId);
    }
  }
}
