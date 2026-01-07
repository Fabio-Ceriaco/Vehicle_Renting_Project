import { Component, signal, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/apiService';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  apiService = inject(ApiService);
  countBookings = signal(0);
  countCars = signal(0);
  countCustomers = signal(0);
  bookingDates = signal<string[]>([]);
  totalRevenue = signal(0);

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData() {
    this.apiService.getDashboardData().subscribe((data) => {
      this.countBookings.set(data.total_bookings);
      this.countCars.set(data.total_cars);
      this.countCustomers.set(data.total_customers);
      this.bookingDates.set(data.booking_dates);
      this.totalRevenue.set(data.total_revenue);
    });
  }
}
