import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from '../../models/role-management';

@Component({
  selector: 'lib-roles-list',
  imports: [CommonModule],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss',
})
export class RolesListComponent {


  @Input() roles: Role[] = [];
  @Output() editRole = new EventEmitter<Role>();
  @Output() deleteRole = new EventEmitter<Role>();


  onEdit(role: Role): void {
    this.editRole.emit(role);
  }

  onDelete(role: Role): void {
    this.deleteRole.emit(role);
  }
}
