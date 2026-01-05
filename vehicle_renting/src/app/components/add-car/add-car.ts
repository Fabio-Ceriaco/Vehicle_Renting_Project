import { Component, input, output, signal, inject, effect, OnInit } from '@angular/core';
import type { Car } from '../../interface/carInterface';
import { CommonModule, JsonPipe } from '@angular/common';
import { ApiService } from '../../services/apiService';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-add-car',
  imports: [ButtonModule, CommonModule],
  templateUrl: './add-car.html',
  styleUrl: './add-car.css',
})
export class AddCar {
  carFormData = signal<Car>({
    Brand: '',
    Model: '',
    Year: 0,
    Color: '',
    Daily_Rate: 0,
    CarImage: '',
    RegNo: '',
  });

  isEditMode = signal<boolean>(false); // to track if we are in edit mode
  updateCar = input<Car | null>(null); // car data to update
  apiService = inject(ApiService); // inject ApiService
  messageService = inject(MessageService); // inject MessageService
  isOpen = input<boolean>(false); // modal open state
  onClose = output<void>(); // emit close event
  refresh = output<void>(); // emit refresh event after adding/updating car

  constructor() {
    // when updateCar changes, update the form data
    // and set edit mode accordingly
    effect(() => {
      const car = this.updateCar();
      if (car) {
        this.carFormData.set(car);
        this.isEditMode.set(true);
      } else {
        this.resetForm();
        this.isEditMode.set(false);
      }
    });
  }

  // Close the modal function
  // Emit the close event to parent component cars.ts
  closeModal() {
    this.onClose.emit();
  }

  // Reset the form data to initial state
  // Used after adding a new car or closing the modal
  resetForm() {
    this.carFormData.set({
      Brand: '',
      Model: '',
      Year: 0,
      Color: '',
      Daily_Rate: 0,
      CarImage: '',
      RegNo: '',
    });
  }

  // Update form data on input change

  updateForm(key: string, event: any) {
    //debugger;
    this.carFormData.update((data) => ({ ...data, [key]: event.target.value }));
  }

  // Update existing car function
  // Calls ApiService to update the car
  updateCarData() {
    this.apiService.updateCar(this.carFormData().ID!, this.carFormData()).subscribe((res) => {
      if (res) {
        this.messageService.add({
          severity: 'success',
          summary: 'Car Updated',
          detail: 'Car has been updated successfully',
          life: 3000,
        });
        this.closeModal(); // close the modal
        this.refresh.emit(); // emit refresh event to parent component cars.ts
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error updating the car',
          life: 3000,
        });
      }
    });
  }

  // Save new car function
  // Calls ApiService to add the new car
  onSaveCar() {
    this.apiService.newCar(this.carFormData()).subscribe((res) => {
      if (res) {
        this.messageService.add({
          severity: 'success',
          summary: 'Car Added',
          detail: 'New car has been added successfully',
          life: 3000,
        });
        this.resetForm(); // reset the form
        this.closeModal(); // close the modal
        this.refresh.emit(); // emit refresh event to parent component cars.ts
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error adding the car',
          life: 3000,
        });
      }
    });
  }
}
