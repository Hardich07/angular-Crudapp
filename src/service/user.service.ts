// user.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiURL = 'https://jsonplaceholder.typicode.com/users';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURL, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURL}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
