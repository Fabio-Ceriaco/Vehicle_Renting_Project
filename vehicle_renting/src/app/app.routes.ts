import { Routes } from '@angular/router';
import { Cars } from './pages/cars/cars';
import { Booking } from './pages/booking/booking';
import { Login } from './pages/login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'cars',
    component: Cars,
  },
  {
    path: 'booking',
    component: Booking,
  },
];
