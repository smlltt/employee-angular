export interface IEmployeeData {
  employeeId: number;
  employeeName?: string | null;
  contactNo?: string | null;
  emailId?: string | null;
  deptId: number | string;
  password?: string | null;
  gender?: string | null;
  role?: string | null;
  createdDate: string;
}

export interface ILoginApiResponse {
  message: string;
  result: boolean;
  data: IEmployeeData;
}

export interface IParentDept {
  departmentId: number;
  departmentName: string;
  departmentLogo: string;
}

export interface IReponseCommon {
  message: string;
  result: boolean;
}

export interface IParentDeptListResponse extends IReponseCommon {
  data: IParentDept[];
}

export interface IChildDept {
  childDeptId: number;
  parentDeptId: number;
  departmentName: string;
}

export interface IChildDeptListResponse extends IReponseCommon {
  data: IChildDept[];
}

export interface IProduct {
  productId: number;
  productName: string;
  shortName: string;
  category: string;
  sku: string;
  price: number;
  thumbnailImageUrl: string | null;
  deliveryTimeSpan: string | null;
}
