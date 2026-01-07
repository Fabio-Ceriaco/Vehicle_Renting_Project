import { inject } from '@angular/core/primitives/di';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem('isLoggedIn') === 'true') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
