import { User } from '@access-control-panel/user-management';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { Permission, Role } from '../models/role-management';
import { API_URL } from '@access-control-panel/core';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {

   private http = inject(HttpClient);
  private environmentUrl = inject(API_URL);
  private apiUrl = `${this.environmentUrl}`;

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

   getRoleById(id: string): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/roles/${id}`);
  }

  createRole(role: Role): Observable<Role> {
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
