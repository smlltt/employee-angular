import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../input/input.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../../api/types';

@Component({
  selector: 'app-table',
  imports: [ReactiveFormsModule, InputComponent, FormsModule],
  templateUrl: './table.component.html',
})
export class TableComponent {
  productService = inject(ProductService);

  isLoading = false;
  products: IProduct[] = [];
  error = '';
  totalProducts = 0;
  currentPage = 1;
  totalPages = 0;

  searchForm = new FormGroup({
    categoryName: new FormControl(''),
    productName: new FormControl(''),
  });
  pageNumber: number = 1;
  pageSize: number = 5;
  sortBy: string = 'productName';
  sortOrder: string = 'asc';

  ngOnInit(): void {
    this.onSearch();
    this.productService.getTotalNumberOfProducts().subscribe({
      next: (data) => {
        this.totalProducts = data;
        this.updatePagination();
      },
    });
  }

  onSort(field: string) {
    console.log('Sort by:', field);
    this.sortBy = field;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.onSearch();
  }

  onSearch() {
    console.log({ pageNumber: this.pageNumber });
    let params = new HttpParams()
      .set('pageNumber', this.pageNumber.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortBy', this.sortBy)
      .set('sortOrder', this.sortOrder);

    if (this.searchForm.value.categoryName) {
      params = params.set('category', this.searchForm.value.categoryName);
    }
    if (this.searchForm.value.productName) {
      params = params.set('shortName', this.searchForm.value.productName);
    }
    this.productService.getProducts(params).subscribe({
      next: (data) => {
        this.products = data;
        console.log('Fetched Products:', this.products);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.isLoading = false;
      },
    });
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
    }
    this.updatePagination();
    this.onSearch();
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
    }
    this.updatePagination();
    this.onSearch();
  }

  onSearchWord() {
    console.log('onSearchWord');
    this.pageNumber = 1;
    this.onSearch();
  }
}
