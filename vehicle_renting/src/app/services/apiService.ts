import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Car } from '../interface/carInterface';
@Injectable({ providedIn: 'root' })
export class ApiService {
  http = inject(HttpClient);

  private apiUrl = 'http://localhost:8000';

  newCar(carsData: any) {
    return this.http.post(`${this.apiUrl}/cars/new-car`, carsData);
  }

  getCars() {
    return this.http.get<Car[]>(`${this.apiUrl}/cars/`);
  }

  deleteCar(carId: number) {
    this.http.delete(`${this.apiUrl}/cars/${carId}`);
  }
}
