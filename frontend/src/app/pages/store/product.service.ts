import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  private apiUrlu = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Método para obtener los productos con una búsqueda opcional
  getProducts(searchQuery: string = ''): Observable<any> {
    return this.http.get(`${this.apiUrl}?search=${searchQuery}`);
  }

  // Método para obtener los productos del usuario autenticado
  getUserProducts(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token disponible');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl, { headers });
  }

  // Método para obtener productos por ID de usuario
  getProductsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  // Verifica si el token existe en localStorage
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

  // Método para obtener los datos del usuario
  getUserData(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrlu}/me`, { headers });
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlu}/${userId}`);
  }

  getAverageRatingByUser(userId: number) {
    return this.http.get<{ average: number }>(`http://localhost:3000/reviews/average/${userId}`);
  }

  deleteProduct(productId: number): Observable<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token disponible');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${productId}`, { headers });
  }

  updateProductStatus(productId: number, newStatus: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token disponible');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.apiUrl}/${productId}`, { estado_publicacion: newStatus }, { headers });
  }
}
