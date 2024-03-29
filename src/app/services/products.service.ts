import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiKey + 'products');
  }

  addNewProduct(newProduct: Product): Observable<Product> {
    newProduct.productId = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Product>(environment.apiKey + 'products', newProduct);
  }
  getProductByGUID(guid: string): Observable<Product> {
    return this.http.get<Product>(environment.apiKey + 'products/' + guid);
  }
  updateProduct(id: string, updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(
      environment.apiKey + 'products/' + id,
      updatedProduct
    );
  }
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(environment.apiKey + 'products/' + id);
  }
}
