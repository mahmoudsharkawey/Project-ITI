import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ICart } from '../../services/cart.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: ICart | null = null;
  errorMessage: string | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe({
      next: (data: ICart) => {
        this.cart = data;
        this.errorMessage = null;
      },
      error: (error: any) => {
        console.error('Error fetching cart items', error);
        this.errorMessage = 'Could not load cart items. Please try again later.';
      },
    });
  }

  deleteProduct(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        this.loadCartItems(); // Reload cart items after deletion
      },
      error: (error: any) => {
        console.error('Error deleting product', error);
      },
    });
  }
}
