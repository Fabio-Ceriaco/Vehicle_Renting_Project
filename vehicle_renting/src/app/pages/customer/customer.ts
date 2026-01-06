import { Component, inject, OnInit, signal } from '@angular/core';
import type { Customers } from '../../interface/customerInterface';
import { ApiService } from '../../services/apiService';
import { CustomerTable } from '../../components/customer-table/customer-table';
import { CommonModule } from '@angular/common';
import { AddCustomer } from '../../components/add-customer/add-customer';
@Component({
  selector: 'app-customer',
  imports: [CustomerTable, CommonModule, AddCustomer],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {
  ngOnInit(): void {
    this.loadCustomers();
  }

  // Inject ApiService
  apiService = inject(ApiService);

  // Signal to hold the list of customers
  customersList = signal<Customers[]>([]);

  selectedCustomer = signal<Customers | null>(null);

  // modal add customer logic can be implemented here
  isAddCustomerModalOpen = signal<boolean>(false);

  // Open add customer modal function
  // Set isAddCustomerModalOpen to true
  openAddCustomerModal() {
    this.selectedCustomer.set(null);
    this.isAddCustomerModalOpen.set(true);
  }

  openEditCustomerModal(customer: Customers) {
    this.selectedCustomer.set(customer);
    this.isAddCustomerModalOpen.set(true);
  }
  // Close add customer modal function
  // Set isAddCustomerModalOpen to false
  closeAddCustomerModal() {
    this.isAddCustomerModalOpen.set(false);
    this.selectedCustomer.set(null);
  }

  // method to handle deleting a customer
  // calls ApiService to delete customer by ID
  // updates customersList signal to remove deleted customer
  // called when delete action is triggered
  // customer: the customer object to be deleted
  handelDeleteCustomer(customer: any) {
    if (customer.ID) {
      this.apiService.deleteCustomer(customer.ID).subscribe(() => {
        this.customersList.update((data) => data.filter((c) => c.ID !== customer.ID));
      });
    }
  }

  // method to load customers from API
  // calls ApiService to get customers
  // updates customersList signal with fetched data
  // called on component initialization and after adding/editing customers
  loadCustomers() {
    this.apiService.getCustomers().subscribe((res) => {
      if (res) {
        this.customersList.set(res);
      } else {
        this.customersList.set([]);
      }
    });
  }
}
