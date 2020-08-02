import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Constants
import { environment } from '../../environments/environment';

// Interfaces
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post<any>(`${environment.api}/api/users/`, user);
  }
  getUser() {
    return this.http.get<User>(`${environment.api}/api/me/`);
  }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api}/api/users/`);
  }
  update(user: User): Observable<any> {
    return this.http.put(`${environment.api}/api/users/${user.id}`, user);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.api}/api/users/${id}`);
  }
}
