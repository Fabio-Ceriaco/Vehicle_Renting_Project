import { ApiService } from '../../services/apiService';
import { Customers } from './../../interface/customerInterface';
import { Component, input, output, signal, inject, effect } from '@angular/core';
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

  // signal to hold customer form data
  // initialized with empty values
  customerFormData = signal<Customers>({
    Name: '',
    Email: '',
    MobileNo: '',
    City: '',
  });

  // input to control modal visibility
  // output to emit close and refresh events
  isOpen = input<boolean>(false); // modal open state
  onClose = output<void>(); // emit close event
  refresh = output<void>(); // emit refresh event after adding customer
  isEditMode = signal<boolean>(false); // to track if we are in edit mode
  updateCustomer = input<Customers | null>(null); // customer data to update
  apiService = inject(ApiService); // inject ApiService
  messageService = inject(MessageService); // inject MessageService

  // constructor to set up effect for edit mode
  // updates form data if updateCustomer input changes
  // otherwise resets the form for new customer
  // uses effect to reactively respond to changes
  // sets isEditMode signal accordingly
  // called when component is initialized
  // and whenever updateCustomer input changes
  // updates customerFormData signal with existing data or resets it
  // to empty values
  constructor() {
    effect(() => {
      const customer = this.updateCustomer(); // get the current customer to update
      if (customer) {
        this.customerFormData.set(customer);
        this.isEditMode.set(true);
      } else {
        this.resetForm();
        this.isEditMode.set(false);
      }
    });
  }

  // method to reset the customer form data to empty values
  // used when adding a new customer
  // sets all fields to empty strings
  // called when the component is initialized for new customer
  // or when the form needs to be cleared

  resetForm() {
    this.customerFormData.set({
      Name: '',
      Email: '',
      MobileNo: '',
      City: '',
    });
  }

  // method to update form data on input change
  // takes the key of the field and the event
  // updates the corresponding field in the customerFormData signal
  // called on input change events
  // key: field name (e.g., 'Name', 'Email')
  // event: input change event
  updateForm(key: string, event: any) {
    this.customerFormData.update((data) => ({
      ...data,
      [key]: event.target.value,
    }));
  }

  // method to update existing customer data
  // calls ApiService to update customer
  // shows success or error message based on response
  // emits refresh event after updating
  // called when saving changes in edit mode
  // uses the ID from customerFormData to identify which customer to update
  // and sends the updated data
  updateCustomerData() {
    this.apiService
      .updateCustomer(this.customerFormData().ID!, this.customerFormData())
      .subscribe((res) => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Customer updated successfully',
            life: 3000,
          });
          this.closeModal();
          this.refresh.emit();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update customer',
            life: 3000,
          });
          this.refresh.emit();
        }
      });
  }

  // method to save a new customer
  // calls ApiService to add new customer
  // shows success or error message based on response
  // resets form and closes modal on success
  // emits refresh event after adding
  // called when saving a new customer
  onSaveCustomer() {
    this.apiService.newCustomer(this.customerFormData()).subscribe((res) => {
      if (res) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Customer added successfully',
          life: 3000,
        });
        this.resetForm();
        this.closeModal();
        this.refresh.emit();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add customer',
          life: 3000,
        });
        this.refresh.emit();
      }
    });
  }

  closeModal() {
    this.onClose.emit();
  }
}
