import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Car } from '../interface/carInterface';
import { Customers } from '../interface/customerInterface';
import { Bookings } from '../interface/bookingInterface';
@Injectable({ providedIn: 'root' })
export class ApiService {
  http = inject(HttpClient);

  private apiUrl = 'http://localhost:8000';

  // Add new car function
  newCar(carsData: any) {
    return this.http.post(`${this.apiUrl}/cars/new-car`, carsData);
  }

  // Get all cars function
  getCars() {
    return this.http.get<Car[]>(`${this.apiUrl}/cars/`);
  }

  // Update existing car function
  updateCar(carId: number, carData: any) {
    return this, this.http.put(`${this.apiUrl}/cars/${carId}`, carData);
  }

  // Delete car function
  deleteCar(carId: number) {
    return this.http.delete(`${this.apiUrl}/cars/${carId}`);
  }

  // Get all customers
  getCustomers() {
    return this.http.get<Customers[]>(`${this.apiUrl}/customers/`);
  }

  // Add new Customer
  newCustomer(customerData: Customers) {
    return this.http.post(`${this.apiUrl}/customers/new-customer`, customerData);
  }

  // Update existing Customer
  updateCustomer(customerId: number, customerData: Customers) {
    return this.http.put(`${this.apiUrl}/customers/${customerId}`, customerData);
  }

  // Delete Customer
  deleteCustomer(customerId: number) {
    return this.http.delete(`${this.apiUrl}/customers/${customerId}`);
  }

  // Get all bookings
  getBookings() {
    return this.http.get<Bookings[]>(`${this.apiUrl}/bookings/`);
  }

  // Add new Booking
  newBooking(bookingData: Bookings) {
    return this.http.post(`${this.apiUrl}/bookings/new-booking`, bookingData);
  }

  // Update existing Booking
  updateBooking(bookingId: number, bookingData: Bookings) {
    return this.http.put(`${this.apiUrl}/bookings/${bookingId}`, bookingData);
  }

  // Delete Booking
  deleteBooking(bookingId: number) {
    return this.http.delete(`${this.apiUrl}/bookings/${bookingId}`);
  }

  // Get dashboard data
  getDashboardData() {
    return this.http.get<any>(`${this.apiUrl}/dashboard/dashboard`);
  }
}
