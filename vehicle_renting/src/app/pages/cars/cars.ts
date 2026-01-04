import { Component, signal } from '@angular/core';
import { CarsCard } from '../../components/cars-card/cars-card';
import { CommonModule } from '@angular/common';
import { AddCar } from '../../components/add-car/add-car';

@Component({
  selector: 'app-cars',
  imports: [CarsCard, CommonModule, AddCar],
  templateUrl: './cars.html',
  styleUrl: './cars.css',
})
export class Cars {
  // modal add car logic can be implemented here
  isAddCarModalOpen = signal<boolean>(false);

  openAddCarModal() {
    this.isAddCarModalOpen.set(true);
  }
  closeAddCarModal() {
    this.isAddCarModalOpen.set(false);
  }
}
