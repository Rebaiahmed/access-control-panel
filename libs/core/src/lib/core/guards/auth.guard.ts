import { AuthStore } from '@access-control-panel/authentication';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  return toObservable(authStore.authenticated).pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        alert('You are already logged in');
        return true;
      } else {
        return router.parseUrl('/login');
      }
    })
  );
};

