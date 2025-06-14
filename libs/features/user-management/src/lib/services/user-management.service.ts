import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user-management.model';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@access-control-panel/core';

/**
 * @description
 * Service responsible for managing user-related data by interacting with the backend API.
 * It provides methods for fetching lists of users and individual user details.
 */

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private http = inject(HttpClient);
  private environmentUrl = inject(API_URL);
  private apiUrl = `${this.environmentUrl}`;

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}
