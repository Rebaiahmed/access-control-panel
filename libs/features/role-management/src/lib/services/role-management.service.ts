import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { Role } from '../models/role-management';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {

   private http = inject(HttpClient);
   private apiUrl = 'http://localhost:3000';

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  createRole(role: Omit<Role, 'id'>): Observable<Role> { // Use Omit for type safety
    return this.http.post<Role>(this.apiUrl, role);
  }

  updateRole(id: number, role: Omit<Role, 'id' | 'name'>): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/${id}`, role);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  isRoleAssignedToUsers(id: number): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/users`).pipe(
      map(users => users.length > 0)
    );
  }

   checkRoleNameExists(roleName: string, currentRoleId?: number): Observable<boolean> {
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
