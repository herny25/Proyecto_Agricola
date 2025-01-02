import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:3000/users/me`, { headers });
  }

  createProduct(productData: any): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      throw new Error('No token found');
    }

    // Decodificar el token para obtener el ID del usuario
    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.id; // Asegúrate de que el campo sea `id`

    // Adjuntar el ID del usuario a los datos del producto
    const productWithUser = { ...productData, id_usuario: userId };

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl, productWithUser, { headers });
  }
}
