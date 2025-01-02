import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); // O de donde estés obteniendo el token
    if (!token) {
      return false;
    }

    // Opcional: Decodifica y valida la estructura o fecha de caducidad del token
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del JWT
      const isExpired = payload.exp * 1000 < Date.now(); // Compara la fecha de caducidad
      return !isExpired;
    } catch (e) {
      console.error('Token inválido:', e);
      return false;
    }
  }


  getUserData(): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/me`, { headers });
  }
}
