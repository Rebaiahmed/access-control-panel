import { Route } from '@angular/router';
import { LoginComponent } from '@access-control-panel/authentication';
import { SidebarComponent } from '@access-control-panel/ui';
import { authGuard, canViewUsersGuard, superAdminGuard } from '@access-control-panel/core';
import { UserDetailComponentComponent } from '@access-control-panel/user-management';


export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: SidebarComponent,
   canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('@access-control-panel/home').then(m => m.HomeComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('@access-control-panel/user-management').then(m => m.UserManagementComponent),
         canActivate: [canViewUsersGuard],
      },
      {
        path: 'users/:id',
        component: UserDetailComponentComponent,
        canActivate: [canViewUsersGuard],
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('@access-control-panel/role-management').then(m => m.RoleManagementComponent),
        canActivate: [superAdminGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
