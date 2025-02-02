import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { routePaths } from '../../app.routes';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  routePaths = routePaths;
  authService = inject(AuthService);

  onLogout() {
    this.authService.logout();
  }
}
