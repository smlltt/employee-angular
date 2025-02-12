import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { AuthGuard } from './guards/auth.guard';
import { TestComponent } from './pages/test/test/test.component';
import { Child1Component } from './pages/child1/child1/child1.component';
import { Child2Component } from './pages/child2/child2/child2.component';

export const routePaths = {
  login: 'login',
  dashboard: 'dashboard',
  employee: 'employee',
  test: 'test',
  testChild1: 'child1',
  testChild2: 'child2',
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
      {
        path: routePaths.test,
        component: TestComponent,
        children: [
          { path: '', redirectTo: routePaths.testChild1, pathMatch: 'full' },
          { path: routePaths.testChild1, component: Child1Component },
          { path: routePaths.testChild2, component: Child2Component },
        ],
      },
    ],
  },
];
