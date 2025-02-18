import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployeeData } from '../../api/types';
import {
  createEmployee as createEmployeeEnpoint,
  employeesUrl,
} from '../../api';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  createEmployee(employee: Omit<IEmployeeData, 'createdDate' | 'employeeId'>) {
    return this.http.post<IEmployeeData>(createEmployeeEnpoint, employee);
  }
  getEmployees() {
    return this.http.get<IEmployeeData[]>(employeesUrl);
  }
}
