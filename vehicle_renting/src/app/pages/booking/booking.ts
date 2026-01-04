import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AddBooking } from '../../components/add-booking/add-booking';
import { BookingTable } from '../../components/booking-table/booking-table';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, AddBooking, BookingTable],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  // modal add car logic can be implemented here
  isAddBookingModalOpen = signal<boolean>(false);

  openAddBookingModal() {
    this.isAddBookingModalOpen.set(true);
  }
  closeAddBookingModal() {
    this.isAddBookingModalOpen.set(false);
  }
}
