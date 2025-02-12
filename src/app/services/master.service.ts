import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getChildDeptUrl, parentDeptUrl } from '../../api';
import {
  IChildDeptListResponse,
  IParentDeptListResponse,
} from '../../api/types';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient) {}
  getParentDeptList() {
    return this.http.get<IParentDeptListResponse>(parentDeptUrl);
  }
  getChildDeptListByParentId(parentDeptId: string) {
    return this.http.get<IChildDeptListResponse>(getChildDeptUrl(parentDeptId));
  }
}
