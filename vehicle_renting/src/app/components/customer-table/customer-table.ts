import { Component, input, output } from '@angular/core';
import { Customers } from '../../interface/customerInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-table',
  imports: [CommonModule],
  templateUrl: './customer-table.html',
  styleUrl: './customer-table.css',
})
export class CustomerTable {
  customers = input<Customers[]>(); // Input property to receive customers list
  onEditCustomer = output<Customers>(); // Emit selected customer for editing
  onDeleteCustomer = output<Customers>(); // Emit customer for deletion

  // Emit edit customer event to parent component customer.ts
  editCustomer(customer: Customers) {
    this.onEditCustomer.emit(customer);
  }

  // Emit delete customer event to parent component customer.ts
  deleteCustomer(customer: Customers) {
    this.onDeleteCustomer.emit(customer);
  }
}
