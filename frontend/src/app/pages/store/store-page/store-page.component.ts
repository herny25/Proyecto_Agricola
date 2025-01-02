import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from './product.interface';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css'],
})
export class StorePageComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  user: any = {};
  showModalu: boolean = false;
  userProducts: any[] = [];
  usuario: any = {};
  showUserModal: boolean = false;
  selectedUser: any = null;
  averageRating: number = 0;
  isSearchExpanded = true;

  isAdmin: boolean = false;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.productService.getUserData().subscribe({
      next: (data) => {
        this.user = data;

        this.isAdmin = this.user?.rol === 'admin';
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
  }

  // Método para cargar los productos
  loadProducts(): void {
    this.productService.getProducts(this.searchQuery).subscribe({
      next: (data: Product[]) => {
        console.log('Productos recibidos:', data);
        this.products = data.filter(
          (product) => product.estado_publicacion === 'activa'
        );
        this.filteredProducts = this.products;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      },
    });
  }

  // Método para filtrar productos según el texto de búsqueda
  searchProducts(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      const lowerSearchQuery = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter(
        (product) =>
          (product.nombre_producto &&
            product.nombre_producto.toLowerCase().includes(lowerSearchQuery)) ||
          (product.usuario?.username &&
            product.usuario.username
              .toLowerCase()
              .includes(lowerSearchQuery)) ||
          (product.usuario?.fullName &&
            product.usuario.fullName.toLowerCase().includes(lowerSearchQuery))
      );
    }
  }

  // Método para verificar si el usuario está logueado
  checkProfile(): void {
    if (!this.productService.isAuthenticated()) {
      // Si no hay token, mostrar el modal
      this.showModalu = true;
    } else {
      // Si el token existe, redirigir al perfil
      this.router.navigate(['/profile']);
    }
  }

  getProductsForUser(userId: number): void {
    this.productService.getProductsByUserId(userId).subscribe({
      next: (data) => {
        this.userProducts = data;
      },
      error: (error) => {
        console.error('Error al obtener los productos del usuario:', error);
      },
    });
  }

  // Método para abrir el modal con los detalles del usuario
  openUserModal(userId: number): void {
    // Obtener los detalles del usuario
    this.productService.getUserById(userId).subscribe({
      next: (data) => {
        this.selectedUser = data;
        this.getProductsForUser(userId); // Cargar productos del usuario
        this.showUserModal = true;
        this.productService
          .getAverageRatingByUser(this.selectedUser.id)
          .subscribe({
            next: (response) => {
              this.averageRating = response.average;
              console.log('Promedio cargado:', this.averageRating);
            },
            error: (err) => {
              console.error('Error al cargar promedio de reseñas:', err);
            },
          });
      },
      error: (error) => {
        console.error('Error al obtener los detalles del usuario:', error);
      },
    });
  }

  sendMessage(): void {
    if (this.user && this.user.celular) {
      const celular = this.user.celular;
      const whatsappUrl = `https://wa.me/${celular}`;
      window.open(whatsappUrl, '_blank');
    } else {
      console.error('No se encontró el número de celular del usuario');
    }
  }

  // Método para cerrar el modal
  closeUserModal(): void {
    this.showUserModal = false;
    this.selectedUser = null; // Limpiar los detalles del usuario
  }

  // Métodos para redirigir a login y registro
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  // Método para cerrar el modal
  closeModalu(): void {
    this.showModalu = false;
  }

  closeModal(): void {
    this.showUserModal = false;
  }

  // Expande la barra de búsqueda al hacer clic
  expandSearch(event: MouseEvent) {
    event.stopPropagation(); // Evita que el evento cierre la barra
    this.isSearchExpanded = true;
  }

  @HostListener('document:click', ['$event'])
  collapseSearch(event: Event): void {
    if (window.innerWidth <= 480) {
      this.isSearchExpanded = false;
    }
  }

  toggleProductStatus(productId: number, currentStatus: string): void {
    const newStatus = currentStatus === 'activa' ? 'inactiva' : 'activa';
    this.productService.updateProductStatus(productId, newStatus).subscribe({
      next: () => {
        this.loadProducts(); // Recarga los productos para reflejar el cambio
        alert(
          `Producto ${
            newStatus === 'activa' ? 'activado' : 'desactivado'
          } exitosamente`
        );
      },
      error: (error) => {
        console.error('Error al cambiar el estado del producto:', error);
        alert('No se pudo cambiar el estado del producto');
      },
    });
  }

  // Admin
  deleteProduct(productId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}
