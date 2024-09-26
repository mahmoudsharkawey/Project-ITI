import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../services/product.model';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'] 
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: IProduct[]) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
  }
}
