import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../services/product.model';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule], // Include CommonModule here
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'] // Corrected to styleUrls
})
export class ProductInfoComponent implements OnInit {
  product!: IProduct | null; // Initialize as null to handle cases when the product isn't found
  errorMessage: string | null = null; // Variable to hold error messages

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(+productId).subscribe({
        next: (data: IProduct) => {
          this.product = data;
          this.errorMessage = null; // Clear any previous error
        },
        error: (error: any) => {
          console.error('Error fetching product details', error);
          this.errorMessage = 'Could not load product details. Please try again later.'; // Set error message for the user
        }
      });
    }
  }
}
