import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { AuthGuard } from './guards/auth.guard';

export const routePaths = {
  login: 'login',
  dashboard: 'dashboard',
  employee: 'employee',
};

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: routePaths.login, component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: routePaths.dashboard,
        component: DashboardComponent,
      },
      { path: routePaths.employee, component: EmployeeComponent },
    ],
  },
];
