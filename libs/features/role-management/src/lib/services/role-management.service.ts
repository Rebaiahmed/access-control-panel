import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { Permission, Role } from '../models/role-management';
import { User } from '@access-control-panel/user-management';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {

   private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000';

    private ALL_PERMISSIONS: Permission[] = [
    { id: 'users.view', name: 'View Users', description: 'Allows viewing user lists' },
    { id: 'users.create', name: 'Create Users', description: 'Allows creating new users' },
    { id: 'users.edit', name: 'Edit Users', description: 'Allows editing existing users' },
    { id: 'users.delete', name: 'Delete Users', description: 'Allows deleting users' },
  ];

    getPermissions(): Permission[] {
        return this.ALL_PERMISSIONS;
    }


  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/roles`);
  }

  createRole(role: Omit<Role, 'id'>): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/roles`, role);
  }

  updateRole(id: string, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/roles/${id}`, role);
  }

  deleteRole(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/roles/${id}`);
  }

  isRoleAssignedToUsers(roleId: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      map(users => users.some(user => user.roleId === roleId))
    );
  }

   checkRoleNameExists(roleName: string, currentRoleId?: string): Observable<boolean> {
    return this.getRoles().pipe(
      delay(500), 
      map(roles => {
        const found = roles.some(role =>
          role.name.toLowerCase() === roleName.toLowerCase() && role.id !== currentRoleId
        );

        return found;
      })
    );
  }
}
