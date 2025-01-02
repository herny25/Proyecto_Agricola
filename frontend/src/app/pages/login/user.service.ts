import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users/login';

  constructor(private http: HttpClient) {}

  loginUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData)
  }
}
