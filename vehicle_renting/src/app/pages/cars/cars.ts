import { Component, inject, OnInit, signal } from '@angular/core';
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
  ngOnInit(): void {
    this.loadCars();
  }
  apiService = inject(ApiService);

  carList = signal<Car[]>([]);
  // modal add car logic can be implemented here
  isAddCarModalOpen = signal<boolean>(false);

  openAddCarModal() {
    this.isAddCarModalOpen.set(true);
  }
  closeAddCarModal() {
    this.isAddCarModalOpen.set(false);
  }

  loadCars() {
    this.apiService.getCars().subscribe((res: Car[]) => {
      if (res) {
        console;
        this.carList.set(res);
      } else {
        this.carList.set([]);
      }
    });
  }
}
