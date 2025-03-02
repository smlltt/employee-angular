import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployeeData } from '../../api/types';
import {
  createEmployee as createEmployeeEnpoint,
  deleteEmployeeUrl,
  employeesUrl,
  updateEmployeeUrl,
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
  editEmployee(
    id: number,
    employee: Omit<IEmployeeData, 'createdDate' | 'employeeId'>
  ) {
    return this.http.put<IEmployeeData>(updateEmployeeUrl(id), employee);
  }
  deleteEmployee(id: number) {
    return this.http.delete(deleteEmployeeUrl(id));
  }
}
