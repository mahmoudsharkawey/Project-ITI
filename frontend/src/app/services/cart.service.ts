import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICart } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartApiUrl = 'http://localhost:3031/cart';

  constructor(private http: HttpClient) {}

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(this.cartApiUrl, { productId, quantity });
  }

  getCartItems(): Observable<ICart> {
    return this.http.get<ICart>(this.cartApiUrl);
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.cartApiUrl}/${productId}`);
  }
}
