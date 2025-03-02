import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IChildDept, IEmployeeData, IParentDept } from '../../../api/types';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeStoreService } from '../../services/employeeStore.service';
import { CommonModule, NgClass } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-employee',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    InputComponent,
    CommonModule,
    NgClass,
    ModalComponent,
  ],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  masterService = inject(MasterService);
  employeeService = inject(EmployeeService);
  employeeStoreService = inject(EmployeeStoreService);
  parentDeptList: IParentDept[] = [];
  childDeptList: IChildDept[] = [];
  parentDeptSelected: undefined | string;
  employees: IEmployeeData[] = [];
  addSectionShown = signal<boolean>(false);
  employeeToBeDeleted = signal<number | undefined>(undefined);
  isEditingEmployeeId = signal<number | undefined>(undefined);

  employeeForm = new FormGroup({
    parentDept: new FormControl('', [Validators.required]),
    childDept: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    employeeName: new FormControl('', [Validators.required]),
    contactNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });
  employees$ = this.employeeStoreService.getEmployees();

  ngOnInit(): void {
    this.getParentDeptList();
    this.employeeForm.get('parentDept')?.valueChanges.subscribe((value) => {
      this.onParentDeptChange(value || '');
    });
  }

  getParentDeptList() {
    this.masterService.getParentDeptList().subscribe((res) => {
      this.parentDeptList = res.data;
    });
  }

  onFormSubmit() {
    const payload = {
      ...this.employeeForm.value,
      emailId: this.employeeForm.value.email || '',
      deptId: this.employeeForm.value.childDept || '',
    };
    delete payload.email;
    delete payload.parentDept;
    delete payload.childDept;
    if (this.isEditingEmployeeId()) {
      this.employeeStoreService.editEmployee(
        this.isEditingEmployeeId() as number,
        payload,
        () => {
          this.employeeForm.reset();
        }
      );
    } else {
      this.employeeStoreService.addEmployee(payload, () => {
        this.employeeForm.reset();
      });
    }
  }

  onParentDeptChange(value: string) {
    this.employeeForm.get('childDept')?.disable();
    this.parentDeptSelected = value;
    this.masterService.getChildDeptListByParentId(value).subscribe((res) => {
      this.childDeptList = res.data;
      if (this.childDeptList.length) {
        this.employeeForm.get('childDept')?.enable();
      }
    });
  }

  toggleAddSectionDisplay(value: boolean) {
    if (!value) {
      this.isEditingEmployeeId.set(undefined);
      this.employeeForm.reset();
    }
    this.addSectionShown.set(value);
  }

  setEmployeeToBeDeleted(id: number | undefined) {
    this.employeeToBeDeleted.set(id);
  }

  setEmployeeToBeEdited(employee: IEmployeeData) {
    this.isEditingEmployeeId.set(employee.employeeId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.employeeForm.reset(employee);
    this.addSectionShown.set(true);
  }

  deleteEmployee() {
    this.employeeToBeDeleted() &&
      this.employeeStoreService.deleteEmployee(
        this.employeeToBeDeleted() as number,
        () => {
          this.setEmployeeToBeDeleted(undefined);
        }
      );
  }
}
