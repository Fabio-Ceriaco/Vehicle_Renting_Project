import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-add-booking',
  imports: [CommonModule],
  templateUrl: './add-booking.html',
  styleUrl: './add-booking.css',
})
export class AddBooking {
  isOpen = input<boolean>(false);

  onClose = output<void>();

  closeModal() {
    this.onClose.emit();
  }
}
