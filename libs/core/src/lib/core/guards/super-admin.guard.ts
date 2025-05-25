// @access-control-panel/core/src/lib/super-admin.guard.ts

import { AuthStore } from '@access-control-panel/authentication';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

/**
 * @description
 * This guard restricts access to routes, allowing only users with 'Super Admin' privileges.
 * If a non-super admin attempts to access a protected route, they are redirected to the home page.
 */

export const superAdminGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return toObservable(authStore.isSuperAdmin).pipe(
    map(isSuperAdmin => {
      if (isSuperAdmin) {
        return true; 
      } else {
        return router.parseUrl('/home');
      }
    })
  );
};
