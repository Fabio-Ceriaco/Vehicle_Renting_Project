import { Component, inject, OnInit, output, signal } from '@angular/core';
import { CarsCard } from '../../components/cars-card/cars-card';
import { CommonModule } from '@angular/common';
import { AddCar } from '../../components/add-car/add-car';
import { ApiService } from '../../services/apiService';
import type { Car } from '../../interface/carInterface';

@Component({
  selector: 'app-cars',
  imports: [CarsCard, CommonModule, AddCar],
  templateUrl: './cars.html',
  styleUrl: './cars.css',
})
export class Cars implements OnInit {
  // Load cars on component initialization
  ngOnInit(): void {
    this.loadCars();
  }
  // Inject ApiService
  apiService = inject(ApiService);

  // Signal to hold the list of cars
  carList = signal<Car[]>([]);

  // modal add car logic can be implemented here
  isAddCarModalOpen = signal<boolean>(false);

  // Signal to hold the selected car for editing
  selectedCar = signal<Car | null>(null);

  // Open add car modal function
  // Set selectedCar to null and open the modal

  openAddCarModal() {
    this.selectedCar.set(null);
    this.isAddCarModalOpen.set(true);
  }

  // Open edit car modal function
  // Set selectedCar to the car to edit and open the modal
  openEditCarModal(car: Car) {
    this.selectedCar.set(car);
    this.isAddCarModalOpen.set(true);
  }

  // Close add car modal function
  // Set isAddCarModalOpen to false and clear selectedCar
  closeAddCarModal() {
    this.isAddCarModalOpen.set(false);
    this.selectedCar.set(null);
  }

  // Handle Delete Car event from AddCar component
  handleDeleteCar(car: any) {
    if (car.ID) {
      this.apiService.deleteCar(car.ID).subscribe(() => {
        this.carList.update((cars) => cars.filter((c) => c.ID !== car.ID));
      });
    }
  }

  // Load cars from API function
  // Calls ApiService to get the list of cars and updates carList signal
  loadCars() {
    this.apiService.getCars().subscribe((res: Car[]) => {
      if (res) {
        this.carList.set(res);
      } else {
        this.carList.set([]);
      }
    });
  }
}
