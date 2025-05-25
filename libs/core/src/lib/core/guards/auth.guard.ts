import { AuthStore } from '@access-control-panel/authentication';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

/**
 * @description
 * This guard protects routes, allowing access only if the user is authenticated.
 * If the user is not logged in, it redirects them to the login page.
 */

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  return toObservable(authStore.authenticated).pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        return router.parseUrl('/login');
      }
    })
  );
};

