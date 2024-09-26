import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';

export const routes: Routes = [
    { path: '', component: ProductsComponent },  // Home route
    { path: 'product/:id', component: ProductInfoComponent } // Product details route
];
