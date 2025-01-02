import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  private userUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Método para obtener los datos del usuario
  getUserData(): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.userUrl}/me`, { headers });
  }

  // Método para obtener los productos del usuario
  getUserProducts(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token disponible');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/my-products`, { headers });
  }

  // Método para eliminar un producto
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
