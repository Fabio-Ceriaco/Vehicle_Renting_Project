import { MessageService } from 'primeng/api';
import { ApiService } from './../../services/apiService';
import { CommonModule } from '@angular/common';
import { Component, inject, input, output, signal, effect } from '@angular/core';

import type { Bookings } from '../../interface/bookingInterface';
import type { Car } from '../../interface/carInterface';

@Component({
  selector: 'app-add-booking',
  imports: [CommonModule],
  templateUrl: './add-booking.html',
  styleUrl: './add-booking.css',
})
export class AddBooking {
  bookingFormData = signal<Bookings>({
    RegNo: '',
    Email: '',
    BookingDate: '',
    Discount: 0,
    TotalBillAmount: 0,
    BookingUid: '',
  });

  carsList = signal<Car[]>([]);
  isOpen = input<boolean>(false);
  refresh = output<void>();
  onClose = output<void>();
  isEditMode = signal<boolean>(false);
  updateBooking = input<Bookings | null>(null);
  apiService = inject(ApiService);
  messageService = inject(MessageService);

  constructor() {
    effect(() => {
      const booking = this.updateBooking();
      if (booking) {
        this.bookingFormData.set(booking);
        this.isEditMode.set(true);
      } else {
        this.resetForm();
        this.isEditMode.set(false);
      }
    });
    this.allCars();
  }

  resetForm() {
    this.bookingFormData.set({
      RegNo: '',
      Email: '',
      BookingDate: '',
      Discount: 0,
      TotalBillAmount: 0,
      BookingUid: '',
    });
  }

  updateForm(key: string, event: any) {
    this.bookingFormData.update((data) => ({
      ...data,
      [key]: event.target.value,
    }));
  }

  allCars() {
    this.apiService.getCars().subscribe((res) => {
      if (res) {
        this.carsList.set(res);
      } else {
        this.carsList.set([]);
      }
    });
  }

  updateBookingData() {
    this.apiService
      .updateBooking(this.bookingFormData().ID!, this.bookingFormData())
      .subscribe((res) => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Booking updated successfully',
          });
          this.closeModal();
          this.refresh.emit();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update booking',
          });
          this.refresh.emit();
        }
      });
  }

  onSaveBooking() {
    console.log(this.bookingFormData());
    this.apiService.newBooking(this.bookingFormData()).subscribe((res) => {
      if (res) {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Booking added successfully',
        });
        this.resetForm();
        this.closeModal();
        this.refresh.emit();
      } else {
        console.log(res);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add booking',
        });
        this.refresh.emit();
      }
    });
  }

  closeModal() {
    this.onClose.emit();
  }
}
