import { BehaviorSubject } from 'rxjs';
import { IEmployeeData } from '../../api/types';
import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmployeeStoreService {
  private employees$ = new BehaviorSubject<IEmployeeData[]>([]);

  constructor(private employeeService: EmployeeService) {
    this.fetchEmployees();
  }

  getEmployees() {
    return this.employees$.asObservable();
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe((res) => {
      this.employees$.next(res);
    });
  }

  addEmployee(employee: Omit<IEmployeeData, 'createdDate' | 'employeeId'>) {
    this.employeeService.createEmployee(employee).subscribe(() => {
      this.fetchEmployees();
    });
  }
}
