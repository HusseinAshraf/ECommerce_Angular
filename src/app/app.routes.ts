import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { authLogedGuard } from './core/guards/auth-loged.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [authLogedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(m => m.RegisterComponent),
      },
      {
        path: 'forgetPassword',
        loadComponent: () =>
          import('./components/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./components/product/product.component').then(m => m.ProductComponent),
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./components/details/details.component').then(m => m.DetailsComponent),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(m => m.CartComponent),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(m => m.BrandsComponent),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(m => m.CategoriesComponent),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./components/wish-list/wish-list.component').then(m => m.WishListComponent),
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/all-orders/all-orders.component').then(m => m.AllOrdersComponent),
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./components/orders/orders.component').then(m => m.OrdersComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./components/profile/profile.component').then(m => m.ProfileComponent),
      },
      {
        path: 'updateData',
        loadComponent: () =>
          import('./components/update-data/update-data.component').then(m => m.UpdateDataComponent),
      },
      {
        path: 'updatePassword',
        loadComponent: () =>
          import('./components/update-password/update-password.component').then(m => m.UpdatePasswordComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(m => m.NotfoundComponent), // Assuming you have a proper 404 component
  },
];
