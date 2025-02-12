import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { routePaths } from '../../app.routes';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  //hradmin@gmail.com
  //112233

  onLogin(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.result) {
          //just POC, not a real implementation (in real world, we should use a token)
          this.authService.setToken(response.data.emailId as string);
          this.router.navigate([routePaths.dashboard]);
        } else {
          alert(response.message);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }
}
