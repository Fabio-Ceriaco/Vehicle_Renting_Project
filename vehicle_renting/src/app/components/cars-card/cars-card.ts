import { Component, input } from '@angular/core';
import type { Car } from '../../interface/carInterface';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-cars-card',
  imports: [],
  templateUrl: './cars-card.html',
  styleUrl: './cars-card.css',
})
export class CarsCard {
  car = input<Car>();

  selectCar(car: Car) {
    console.log(car);
  }
}
