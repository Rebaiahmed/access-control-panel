export interface User {
    id: string;
    username: string;
    password?: string;
    fullName: string;
    roles: string[];
    isSuperAdmin: boolean;
    role?:string;
  }