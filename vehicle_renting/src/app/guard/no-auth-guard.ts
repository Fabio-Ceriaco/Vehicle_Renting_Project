import { CanActivate, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  // Inject Router
  router = inject(Router);

  // Implement canActivate method
  // to prevent access if authenticated
  // Redirect to dashboard if logged in
  // Allow access to login if not logged in
  canActivate(): boolean {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
