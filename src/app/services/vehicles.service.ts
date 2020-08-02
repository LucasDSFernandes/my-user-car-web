import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Constants
import { environment } from '../../environments/environment';

// Interfaces
import { User } from '../interfaces/user';
import { Vehicle } from '../interfaces/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) { }

  register(vehicle: Vehicle) {
    return this.http.post<any>(`${environment.api}/api/cars/`, vehicle);
 }
  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${environment.api}/api/cars/`);
  }

  update(vehicle: Vehicle): Observable<any> {
    return this.http.put(`${environment.api}/api/cars/${vehicle.id}`, vehicle);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.api}/api/cars/${id}`);
  }
}
