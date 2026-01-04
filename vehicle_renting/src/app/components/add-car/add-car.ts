import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-add-car',
  imports: [],
  templateUrl: './add-car.html',
  styleUrl: './add-car.css',
})
export class AddCar {
  isOpen = input<boolean>(false);

  onClose = output<void>();

  closeModal() {
    this.onClose.emit();
  }
}
