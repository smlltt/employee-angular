import { inject, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { routePaths } from '../app.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);
  canActivate(): boolean {
    console.log('test');
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate([routePaths.login]);
      return false;
    }
  }
}
