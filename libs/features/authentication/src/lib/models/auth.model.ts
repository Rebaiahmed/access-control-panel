
import { User } from '@access-control-panel/user-management';

export interface LoginResponse {
    token: string;
    user: User;
  }

export interface LoginCredentials {
    username: string;
    password: string;
  }