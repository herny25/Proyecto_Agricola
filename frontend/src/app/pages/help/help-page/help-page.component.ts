import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../home/auth.service';
interface AccordionItem {
  title: string;
  content: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.css']
})

export class HelpPageComponent {
  showModal: boolean = false;
  isOpen: boolean[] = new Array(6).fill(false);
  user: any = {};

  constructor(private router: Router, private authService: AuthService) {}
  toggleAccordion(index: number): void {
    this.isOpen[index] = !this.isOpen[index];
  }

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
      },
    });
  }

  // Método para verificar si el usuario está logueado
  checkProfile(): void {
    if (!this.authService.isAuthenticated()) {
      // Si no hay token, mostrar el modal
      this.showModal = true;
    } else {
      // Si el token existe, redirigir al perfil
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
