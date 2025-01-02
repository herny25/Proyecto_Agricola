import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

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
}
