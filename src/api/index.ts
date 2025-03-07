const baseUrl = '/api/EmployeeManagement';
export const loginUrl = `${baseUrl}/login`;
export const parentDeptUrl = `${baseUrl}/GetParentDepartment`;
export const getChildDeptUrl = (parentId: string) =>
  `${baseUrl}/GetChildDepartmentByParentId?deptId=${parentId}`;
export const createEmployee = `${baseUrl}/CreateEmployee`;
export const employeesUrl = `${baseUrl}/GetAllEmployees`;
export const updateEmployeeUrl = (id: number) =>
  `${baseUrl}/UpdateEmployee/${id}`;
export const deleteEmployeeUrl = (id: number) =>
  `${baseUrl}/DeleteEmployee/${id}`;
