import { Routes } from '@angular/router';
import { Cars } from './pages/cars/cars';
import { Booking } from './pages/booking/booking';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Customer } from './pages/customer/customer';
import { authGuard } from './guard/auth-guard';
import { NoAuthGuard } from './guard/no-auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [NoAuthGuard], // Prevent access if already authenticated
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'cars',
        component: Cars,
      },
      {
        path: 'booking',
        component: Booking,
      },
      {
        path: 'customers',
        component: Customer,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
