import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtUtils } from './jwt-utils'; 
import { User } from '@access-control-panel/user-management';
import { Observable, of, switchMap } from 'rxjs';
import { LoginCredentials, LoginResponse } from '../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      switchMap((users: User[]) => {
        const foundUser = users.find(
          (u) => u.username === credentials.username && u.password === credentials.password
        );
        if (foundUser) {
          const generatedToken = JwtUtils.generateFrontendToken({
            userId: foundUser.id,
            username: foundUser.username,
            roleId: foundUser.roleId,
            exp: Date.now() + 3600 * 1000,
          });

          JwtUtils.saveToken(generatedToken);
          return of({ user: foundUser, token: generatedToken } as LoginResponse);
        } else {
          throw new Error('Invalid username or password');
        }
      })
    );
  }


  logout(): void {
    JwtUtils.removeToken();
    this.router.navigate(['/login']);
  }

  removeToken(): void {
    JwtUtils.removeToken();
  }

  saveToken(token: string): void {
    JwtUtils.saveToken(token);
  }

  getToken(): string | null {
    return JwtUtils.getToken();
  }

  


}
