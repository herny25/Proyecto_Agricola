import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  showModal: boolean = false;
  user: any = {};

  constructor(private router: Router, private authService: AuthService) {}

  goToStore(): void {
    this.router.navigate(['/store']);
  }

  ngOnInit(): void {
    this.authService.getUserData().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        console.log(this.showModal);
      },
    });
  }

  checkProfile(): void {
    if (!this.authService.isAuthenticated()) {
      // Si no hay token, mostrar el modal
      this.showModal = true;
      console.log("token");
    } else {
      // Si el token existe, redirigir al perfil
      console.log("no token");
      this.router.navigate(['/profile']);
    }
  }

  // Métodos para redirigir a login y registro
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.showModal = false;
  }
}
