import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../services/product.model';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = []; // Array to hold categories

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: IProduct[]) => {
        this.products = data;
        this.categories = [...new Set(data.map(product => product.category))]; // Extract unique categories
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
  }

  filteredProducts() {
    return this.products.filter(product => {
      const matchesSearchTerm = product.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      return matchesSearchTerm && matchesCategory;
    });
  }

  filterProducts() {
    // This method can be used to trigger filtering if needed
  }
}
