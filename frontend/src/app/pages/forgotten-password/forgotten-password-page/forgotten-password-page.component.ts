import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-forgotten-password-page',
  templateUrl: './forgotten-password-page.component.html',
  styleUrl: './forgotten-password-page.component.css',
})
export class ForgottenPasswordPageComponent {
  email: string = '';

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.setEmail();
  }

  setEmail(): void {
    this.userService.getUserData().subscribe(
      (user) => {
        if (user && user.email) {
          this.email = user.email; // If logged in, assign email
        } else {
          this.email = ''; // If not logged in, leave empty
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.email = ''; // Handle error if no user data available
      }
    );
  }

  recoverPassword() {
    this.http
      .post('http://localhost:3000/users/forgot-password', {
        email: this.email,
      })
      .subscribe({
        next: () => alert('Código enviado a tu Correo'),
        error: (err) => alert('Error: ' + err.error.message),
      });
  }
}
