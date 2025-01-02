import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  img: string | null = null;
  base64Image: string | null = null;
  user: any = {};
  averageRating: number = 0;

  isEditing: boolean = false;
  errors: any;

  municipios = [
    'Azurduy', 'Tarvita', 'Villa Serrano', 'Monteagudo', 'Huacareta', 'Muyupampa', 'Huacaya',
    'Macharetí', 'Camargo', 'San Lucas', 'Incahuasi', 'Villa Charcas', 'Sucre', 'Yotala',
    'Poroma', 'Villa Abecia', 'Culpina', 'Las Carreras', 'Padilla', 'Tomina', 'Sopachuy',
    'Villa Alcalá', 'El Villar', 'Tarabuco', 'Yamparáez', 'Zudánez', 'Presto', 'Mojocoya', 'Icla'
  ];

  constructor(private userService: UserService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe({
      next: (data) => {
        this.user = data;
        this.userService.getAverageRatingBySeller(this.user.id).subscribe({
          next: (response) => {
            this.averageRating = response.average;
          },
          error: (err) => {
            console.error('Error al cargar promedio de reseñas:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });

    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.userService.logout(); // Elimina el token y otros datos de la sesión
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    this.errors = {};
    if (this.user.username && this.user.username.length > 11) {
      this.errors['username'] = 'El nombre de usuario debe tener menos de 11 caracteres.';
      alert('El nombre de usuario debe tener menos 11 caracteres.');
    }
    if (this.user.celular && !/^\d{8}$/.test(this.user.celular)) {
      this.errors['celular'] = 'El número de celular debe tener exactamente 8 dígitos.';
      alert('El número de celular debe tener exactamente 8 dígitos.');
    }
    if (this.user.birthDate) {
      const birthYear = new Date(this.user.birthDate).getFullYear();
      if (birthYear >= 2015) {
        this.errors['birthDate'] = 'La fecha de nacimiento debe ser antes de 2015.';
        alert('La fecha de nacimiento debe ser antes de 2015.');
      }
    }
    if (this.user.birthDate) {
      const birthYear = new Date(this.user.birthDate).getFullYear();
      if (birthYear <= 1950) {
        this.errors['birthDate'] = 'La fecha de nacimiento debe ser minimo del 1950.';
        alert('La fecha de nacimiento debe ser minimo del 1950.');
      }
    }
    if (Object.keys(this.errors).length > 0) {
      return;
    }
    if (!this.user.fullName || !this.user.municipio || !this.user.celular || !this.user.sexo || !this.user.birthDate || !this.user.username || !this.user.password) {
      alert('Por favor complete todos los campos obligatorios.');
      return; // No continuar con el guardado si hay campos vacíos
    }
    this.userService.updateUserData(this.user).subscribe({
      next: () => {
        this.isEditing = false;
        alert('Datos guardados exitosamente.');
      },
      error: (err) => {
        console.error('Error al guardar los cambios:', err);
      },
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.ngOnInit();
  }

  changePhoto(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.base64Image = reader.result as string;
        this.img = this.base64Image;
        this.user.img = this.base64Image;
        this.saveChanges()
      };
      reader.readAsDataURL(file);
    }
  }

  deletePhoto(): void {
    this.img = null;
    this.user.img = null;

    this.userService.updateUserData(this.user).subscribe({
      next: () => {
        alert('Foto de perfil eliminada exitosamente.');
      },
      error: (err) => {
        console.error('Error al eliminar la foto de perfil:', err);
      },
    });
  }

  goToStore(): void {
    this.router.navigate(['/store']); // Redirige a la página de la tienda
  }

  goToChangePassword() {
    this.router.navigate(['/forgotten-password']);
  }


}
