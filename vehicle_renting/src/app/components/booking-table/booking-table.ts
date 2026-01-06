import { Component, input, output } from '@angular/core';
import type { Bookings } from '../../interface/bookingInterface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-booking-table',
  imports: [CommonModule],
  templateUrl: './booking-table.html',
  styleUrl: './booking-table.css',
})
export class BookingTable {
  bookings = input<Bookings[]>(); // Input property to receive bookings list
  onEditBooking = output<Bookings>(); // Emit selected booking for editing
  onDeleteBooking = output<Bookings>(); // Emit booking for deletion

  // Emit edit booking event to parent component booking.ts
  // Passes the selected booking object for editing
  // Called when edit button is clicked
  // emits the booking data to the parent component
  editBooking(booking: Bookings) {
    this.onEditBooking.emit(booking);
  }

  // Emit delete booking event to parent component booking.ts
  // Passes the selected booking object for deletion
  // Called when delete button is clicked
  // emits the booking data to the parent component
  deleteBooking(booking: Bookings) {
    this.onDeleteBooking.emit(booking);
  }
}
