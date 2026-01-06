import { Bookings } from './../../interface/bookingInterface';
import { ApiService } from './../../services/apiService';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AddBooking } from '../../components/add-booking/add-booking';
import { BookingTable } from '../../components/booking-table/booking-table';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, AddBooking, BookingTable],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {
  ngOnInit(): Bookings | void {
    this.loadBookings();
  }
  // modal add car logic can be implemented here
  isAddBookingModalOpen = signal<boolean>(false);

  apiService = inject(ApiService);

  bookingList = signal<Bookings[]>([]);

  selectedBooking = signal<Booking | null>(null);

  openAddBookingModal() {
    this.isAddBookingModalOpen.set(true);
  }
  closeAddBookingModal() {
    this.isAddBookingModalOpen.set(false);
  }

  // method to handle deleting a booking
  // calls ApiService to delete booking by ID
  // updates bookingList signal to remove deleted booking
  // called when delete action is triggered
  // booking: the booking object to be deleted
  handelDeleteBooking(booking: any) {
    if (booking.ID) {
      this.apiService.deleteBooking(booking.ID).subscribe(() => {
        this.bookingList.update((data) => data.filter((b) => b.ID !== booking.ID));
      });
    }
  }

  // method to load bookings from API
  // calls ApiService to get bookings
  // updates bookingList signal with fetched data
  // called on component initialization and after adding/editing bookings
  loadBookings() {
    this.apiService.getBookings().subscribe((res) => {
      if (res) {
        this.bookingList.set(res);
      } else {
        this.bookingList.set([]);
      }
    });
  }
}
