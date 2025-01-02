import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  user = {
    fullName: '',
    username: '',
    municipio: '',
    celular: '',
    birthDate: '',
    password: '',
    sexo: '',
    rol: 'vendedor',
    email: '',
  };

  municipios = [
    'Azurduy', 'Tarvita', 'Villa Serrano', 'Monteagudo', 'Huacareta', 'Muyupampa', 'Huacaya',
    'Macharetí', 'Camargo', 'San Lucas', 'Incahuasi', 'Villa Charcas', 'Sucre', 'Yotala',
    'Poroma', 'Villa Abecia', 'Culpina', 'Las Carreras', 'Padilla', 'Tomina', 'Sopachuy',
    'Villa Alcalá', 'El Villar', 'Tarabuco', 'Yamparáez', 'Zudánez', 'Presto', 'Mojocoya', 'Icla'
  ];

  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    if (this.isValidForm()) {
      if (this.user.password) {
        this.userService.registerUser(this.user).subscribe(
          (response) => {
            console.log('Usuario registrado:', response);
            alert('¡Registro exitoso!');
            localStorage.setItem('token', response.token);
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Error al registrar:', error);
            alert('Hubo un problema al registrar. Intenta nuevamente.');
          }
        );
      } else {
        alert('Por favor completa todos los campos');
      }
    } else {
      alert(this.errorMessage || 'Por favor completa todos los campos correctamente.');
    }
  }

  private isValidForm(): boolean {
    const { fullName, username, municipio, celular, birthDate, password, sexo, rol } = this.user;
    if (this.user.username && this.user.username.length > 11) {
      this.errorMessage = 'El nombre de usuario debe tener menos de 11 dígitos.';
      return false;
    }
    if (celular.trim() === '' || !celular.match(/^\d{8}$/)) {
      this.errorMessage = 'El número de celular debe tener exactamente 8 dígitos.';
      return false;
    }
    const birthYear = new Date(birthDate).getFullYear();
    if (birthDate.trim() !== '' && birthYear > 2015) {
      this.errorMessage = 'El año de nacimiento debe ser antes de 2015.';
      return false;
    }
    if (birthDate.trim() !== '' && birthYear < 1950) {
      this.errorMessage = 'El año de nacimiento debe ser minimo del 1950.';
      return false;
    }
    this.errorMessage = '';
    return (
      fullName.trim() !== '' &&
      username.trim() !== '' &&
      municipio.trim() !== '' &&
      celular.trim() !== '' &&
      birthDate.trim() !== '' &&
      password.trim() !== '' &&
      sexo.trim() !== '' &&
      rol.trim() !== ''
    );
  }
}
