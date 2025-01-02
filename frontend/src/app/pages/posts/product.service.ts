import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  getProductsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/user/${userId}`);
  }

  // Verifica si el token existe
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
    return this.http.get<any>(`${this.apiUrl}/users/me`, { headers });
  }

  createReview(reviewData: any): Observable<any> {
    return this.http.post('http://localhost:3000/reviews', reviewData);
  }

  getReviewsByProduct(productId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/reviews/${productId}`);
  }

  getAverageRatingByUser(userId: number) {
    return this.http.get<{ average: number }>(`http://localhost:3000/reviews/average/${userId}`);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/reviews/${id}`);
  }
}
