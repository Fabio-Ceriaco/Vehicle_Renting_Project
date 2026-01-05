import { Component, input, output, signal, inject } from '@angular/core';
import type { Car } from '../../interface/carInterface';
import { JsonPipe } from '@angular/common';
import { ApiService } from '../../services/apiService';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-add-car',
  imports: [JsonPipe, ButtonModule],
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

  apiService = inject(ApiService);
  messageService = inject(MessageService);
  isOpen = input<boolean>(false);

  onClose = output<void>();

  closeModal() {
    this.onClose.emit();
  }

  updateForm(key: string, event: any) {
    //debugger;
    this.carFormData.update((data) => ({ ...data, [key]: event.target.value }));
  }

  onSaveCar() {
    this.apiService.newCar(this.carFormData()).subscribe((res) => {
      if (res) {
        this.messageService.add({
          severity: 'success',
          summary: 'Car Added',
          detail: 'New car has been added successfully',
          life: 3000,
        });
        this.closeModal();
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
