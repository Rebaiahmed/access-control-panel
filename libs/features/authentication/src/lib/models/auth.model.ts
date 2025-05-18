
import { User } from '@access-control-panel/user-management';

export interface LoginResponse {
    token: string;
    user: User;
  }

export interface LoginCredentials {
    username: string;
    password: string;
  }

  export const USER_ROLES = {
    SUPER_ADMIN: 'superadmin',
    ADMIN: 'admin',
  } as const;