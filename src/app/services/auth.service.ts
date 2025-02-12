import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { loginUrl } from '../../api';
import { routePaths } from '../app.routes';
import { ILoginApiResponse } from '../../api/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  constructor(private http: HttpClient, private router: Router) {}
  login({
    username,
    password,
  }: Partial<{ username: string | null; password: string | null }>) {
    return this.http.post<ILoginApiResponse>(loginUrl, { username, password });
  }
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('access_token', token);
  }
  getToken(): string | null {
    return this.token || localStorage.getItem('access_token');
  }
  logout(): void {
    this.token = null;
    localStorage.removeItem('access_token');
    this.router.navigateByUrl(routePaths.login);
  }
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
