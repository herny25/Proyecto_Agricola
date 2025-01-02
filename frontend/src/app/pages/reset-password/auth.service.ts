import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      token,
      newPassword,
    }).pipe(
      catchError((error) => {
        if (error.status === 400 && error.error.message === 'La nueva contraseña no puede ser la misma que la actual') {
          return throwError(() => new Error('La nueva contraseña no puede ser la misma que la actual.'));
        }
        return throwError(() => error);
      })
    );
  }
}
