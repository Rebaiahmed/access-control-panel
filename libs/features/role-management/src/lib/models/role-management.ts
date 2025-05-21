export interface Permission {
    id: string;
    name: string;
    description: string;
  }
  
  export enum PermissionAction {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete',
    MANAGE = 'manage'
  }

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}