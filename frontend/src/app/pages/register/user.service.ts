import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users/register';

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
