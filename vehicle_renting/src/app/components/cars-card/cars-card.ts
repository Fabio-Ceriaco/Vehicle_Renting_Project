import { Component, input, output, signal, inject } from '@angular/core';
import type { Car } from '../../interface/carInterface';

@Component({
  selector: 'app-cars-card',
  imports: [],
  templateUrl: './cars-card.html',
  styleUrl: './cars-card.css',
})
export class CarsCard {
  car = input<Car>(); // Car data input from parent component cars.ts
  onEditCar = output<Car>(); // Emit selected car for editing
  onDeleteCar = output<Car>(); // Emit car ID for deletion

  // Emit edit car event to parent component cars.ts
  // Passes the selected car object for editing
  // Called when edit button is clicked
  // emits the car data to the parent component
  editCar(car: Car) {
    this.onEditCar.emit(car);
  }

  // Emit delete car event to parent component cars.ts
  // Passes the selected car object for deletion
  // Called when delete button is clicked
  // emits the car data to the parent component
  deleteCar(car: Car) {
    //debugger;
    this.onDeleteCar.emit(car);
  }
}
