import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  product: Product = {
    productId: '',
    name: '',
    category: '',
    color: '',
    price: 0,
  };
  constructor(
    private router: Router,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.productService.getProductByGUID(id).subscribe({
            next: (item) => {
              this.product = item;
            },
            error: (response) => {
              console.log(response);
            },
          });
        }
      },
    });
  }
  updateProduct() {
    this.productService
      .updateProduct(this.product.productId, this.product)
      .subscribe({
        next: (response) => {
          this.router.navigate(['products']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
