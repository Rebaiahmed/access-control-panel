import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from '@access-control-panel/core';
import { AuthStore } from '@access-control-panel/authentication';


/**
 * @description
 * This guard grants access to the user management section if the user has any permission
 * related to viewing, creating, editing, or deleting users, or if they are a Super Admin.
 * If access is denied, a toast message is displayed, and the user is redirected to the home page.
 */

export const canViewUsersGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  const toastService = inject(ToastService);
  if ( authStore.hasPermission('users.view') ||
    authStore.hasPermission('users.edit') ||
    authStore.hasPermission('users.delete') || authStore.isSuperAdmin()) {
    return true;
  } else {
    toastService.error('You do not have permission to view users.');
    return router.parseUrl('/home');
  }
};