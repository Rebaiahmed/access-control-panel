export interface User {
    id: string;
    username: string;
    password?: string;
    fullName: string;
    roles: string[];
    isSuperAdmin: boolean;
    email?: string;
    isActive: boolean;
  }