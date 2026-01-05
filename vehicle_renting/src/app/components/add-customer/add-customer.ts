import { ApiService } from '../../services/apiService';
import { Customers } from './../../interface/customerInterface';
import { Component, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-customer',
  imports: [CommonModule, ButtonModule],
  templateUrl: './add-customer.html',
  styleUrl: './add-customer.css',
})
export class AddCustomer {
  customerFormData = signal<Customers>({
    Name: '',
    Email: '',
    MobileNo: '',
    City: '',
  });

  isOpen = input<boolean>(false); // modal open state
  onClose = output<void>(); // emit close event
  refresh = output<void>(); // emit refresh event after adding customer

  apiService = inject(ApiService); // inject ApiService
  messageService = inject(MessageService); // inject MessageService

  resetForm() {
    this.customerFormData.set({
      Name: '',
      Email: '',
      MobileNo: '',
      City: '',
    });
  }

  updateForm(key: string, event: any) {
    this.customerFormData.update((data) => ({
      ...data,
      [key]: event.target.value,
    }));
  }

  onSaveCustomer() {
    this.apiService.newCustomer(this.customerFormData()).subscribe((res) => {
      if (res) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Customer added successfully',
        });
        this.resetForm();
        this.closeModal();
        this.refresh.emit();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add customer',
        });
        this.refresh.emit();
      }
    });
  }

  closeModal() {
    this.onClose.emit();
  }
}
