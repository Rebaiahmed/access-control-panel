import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { Permission, Role } from '../models/role-management';

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
    return this.http.get<Role[]>(this.apiUrl);
  }

  createRole(role: Omit<Role, 'id'>): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, role);
  }

  updateRole(id: string, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/${id}`, role);
  }

  deleteRole(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  isRoleAssignedToUsers(id: number): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/users`).pipe(
      map(users => users.length > 0)
    );
  }

   checkRoleNameExists(roleName: string, currentRoleId?: string): Observable<boolean> {
    return this.getRoles().pipe(
      delay(500), // Simulate network delay
      map(roles => {
        const found = roles.some(role =>
          role.name.toLowerCase() === roleName.toLowerCase() && role.id !== currentRoleId
        );
        console.log(`Uniqueness check result for "${roleName}": ${found ? 'Exists' : 'Unique'}`);
        return found;
      })
    );
  }
}
