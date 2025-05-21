export interface User {
    id: string;
    username: string;
    password?: string;
    fullName: string;
    isSuperAdmin: boolean;
    roleId?: string;
  }