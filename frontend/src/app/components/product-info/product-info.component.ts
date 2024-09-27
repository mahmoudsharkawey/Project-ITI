import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../services/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  product!: IProduct | null;
  quantity: number = 1;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe({
        next: (data: IProduct) => {
          this.product = data;
          this.errorMessage = null;
        },
        error: (error: any) => {
          console.error('Error fetching product details', error);
          this.errorMessage = 'Could not load product details. Please try again later.';
        }
      });
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.quantity).subscribe({
        next: () => {
          alert('Product added to cart!');
        },
        error: (error) => {
          console.error('Error adding to cart', error);
          alert('Failed to add product to cart. Please try again.');
        }
      });
    }
  }
}
