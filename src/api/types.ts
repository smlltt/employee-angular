interface EmployeeData {
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role: string;
  createdDate: string;
}

export interface LoginApiResponse {
  message: string;
  result: boolean;
  data: EmployeeData;
}
