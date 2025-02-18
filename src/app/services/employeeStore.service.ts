import { BehaviorSubject } from 'rxjs';
import { IEmployeeData } from '../../api/types';
import { EmployeeService } from './employee.service';
import { inject, Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class EmployeeStoreService {
  private employees$ = new BehaviorSubject<IEmployeeData[]>([]);
  toastService = inject(ToastService);

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

  addEmployee(
    employee: Omit<IEmployeeData, 'createdDate' | 'employeeId'>,
    onSuccess?: () => void
  ) {
    this.employeeService.createEmployee(employee).subscribe({
      next: () => {
        this.fetchEmployees();
        this.toastService.show({
          message: 'Employee added successfully',
          type: 'alert-success',
        });
        onSuccess?.();
      },
      error: () => {
        this.toastService.show({
          message: 'Failed to add employee',
          type: 'alert-error',
        });
      },
    });
  }

  deleteEmployee(id: number, onSuccess?: () => void) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.fetchEmployees();
        this.toastService.show({
          message: 'Employee removed successfully',
          type: 'alert-success',
        });
        onSuccess?.();
      },
      error: () => {
        this.toastService.show({
          message: 'Failed to remove employee',
          type: 'alert-error',
        });
      },
    });
  }
}
