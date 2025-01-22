import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Car} from './car'

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private _httpClient:HttpClient) { }

  baseUrl:String="http://localhost:3000/cars"
  
  fetchAllCars():Observable<Car[]>{
    return this._httpClient.get<Car[]>(`${this.baseUrl}`);
  }

  createCar(data:Car){
    return this._httpClient.post<Car>(`${this.baseUrl}`,data);
  }

  updateCar(data: Car){
    return this._httpClient.put<Car>(`${this.baseUrl}/${data.id}`,data);
  }

  deleteCar(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
