import { Routes } from '@angular/router';
import { Cars } from './pages/cars/cars';
import { Booking } from './pages/booking/booking';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Customer } from './pages/customer/customer';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: Layout,
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
