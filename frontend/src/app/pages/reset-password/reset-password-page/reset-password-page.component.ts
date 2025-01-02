import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css'
})
export class ResetPasswordPageComponent {
  token: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordVisible1: boolean = false;
  passwordVisible2: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtener el token desde la URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente.');
      return; // Detener la ejecución si las contraseñas no coinciden
    }

    this.authService.resetPassword(this.token, this.password).subscribe(
      (response) => {
        console.log('Contraseña cambiada exitosamente', response);
        alert('Contraseña cambiada exitosamente!');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al cambiar la contraseña', error);
        alert(error.message); // Mostrar el mensaje de error
      }
    );
  }

  togglePasswordVisibility1(): void {
    this.passwordVisible1 = !this.passwordVisible1; // Alterna la visibilidad
  }

  togglePasswordVisibility2(): void {
    this.passwordVisible2 = !this.passwordVisible2; // Alterna la visibilidad
  }
}
