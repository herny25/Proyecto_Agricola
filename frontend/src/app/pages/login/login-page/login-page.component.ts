import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login() {
    if (this.user.email && this.user.password) {
      this.userService.loginUser(this.user).subscribe(
        (response) => {
          console.log('Usuario conectado:', response);
          console.log('Rol del usuario:', response.rol);
          alert('¡Registro exitoso!');
          this.router.navigate(['/home']);
          localStorage.setItem('token', response.token);
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          alert('Hubo un problema al iniciar sesión. Intenta nuevamente.');
        }
      );
    } else {
      alert('Por favor completa todos los campos');
    }
  }

  goToResetPassword(): void {
    this.router.navigate(['/forgotten-password']);
  }
}
