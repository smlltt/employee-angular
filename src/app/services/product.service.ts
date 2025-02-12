import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../../api/types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(params: HttpParams) {
    return this.http.get<IProduct[]>(
      'https://projectapi.gerasim.in/api/Products',
      {
        params,
      }
    );
  }
  getTotalNumberOfProducts() {
    return this.http.get<number>(
      'https://projectapi.gerasim.in/api/Products/getTotalProduct'
    );
  }
}
