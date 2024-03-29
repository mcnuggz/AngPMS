import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ToastService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  private _success = new Subject<string>();
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;
  successMessage: string = '';

  products: Product[] = [];
  constructor(
    private router: Router,
    private productService: ProductsService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(2500)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  deleteProduct(id: string) {
    let userConfirm = confirm(
      'Are you sure you want to delete this product? This cannot be reversed!'
    );
    if (userConfirm) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          this._success.next('Data was successfully deleted!');
          this.getProducts();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
