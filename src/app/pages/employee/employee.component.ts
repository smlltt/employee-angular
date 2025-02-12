import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IChildDept, IParentDept } from '../../../api/types';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  imports: [ReactiveFormsModule, InputComponent, InputComponent],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  masterService = inject(MasterService);
  employeeService = inject(EmployeeService);
  parentDeptList: IParentDept[] = [];
  childDeptList: IChildDept[] = [];
  parentDeptSelected: undefined | string;

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

  onCreateEmployee() {
    const payload = {
      ...this.employeeForm.value,
      deptId: this.employeeForm.value.childDept || '',
    };
    delete payload.parentDept;
    delete payload.childDept;
    this.employeeService.createEmployee(payload).subscribe((res) => {
      console.log('Employee created:', res);
    });
    console.log(this.employeeForm.value);
  }

  onParentDeptChange(value: string) {
    this.employeeForm.get('childDept')?.disable();
    this.parentDeptSelected = value;
    this.masterService.getChildDeptListByParentId(value).subscribe((res) => {
      this.childDeptList = res.data;
      if (this.childDeptList.length) {
        this.employeeForm.get('childDept')?.enable();
      }

      console.log('Child Dept list:', this.childDeptList);
    });
  }
}
