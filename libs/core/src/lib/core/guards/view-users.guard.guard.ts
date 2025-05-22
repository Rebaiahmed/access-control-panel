import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from '@access-control-panel/core';
import { AuthStore } from '@access-control-panel/authentication';

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