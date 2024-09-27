import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    { path: '', component: ProductsComponent },  
    { path: 'product/:id', component: ProductInfoComponent }, 
    { path: 'cart', component: CartComponent },
];
