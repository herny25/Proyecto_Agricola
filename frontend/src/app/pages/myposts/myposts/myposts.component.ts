import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../myposts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css'],
})
export class MypostsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  user: any = {};
  searchQuery: string = '';
  isSearchExpanded = true;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
    this.productService.getUserData().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
  }

  loadProducts(): void {
    this.productService.getUserProducts().subscribe({
      next: (data) => {
        console.log('Productos recibidos:', data);
        this.products = data;
        this.filteredProducts = data;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      },
    });
  }

  deleteProduct(productId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(
            (product) => product.id !== productId
          );
          this.filteredProducts = this.filteredProducts.filter(
            (product) => product.id !== productId
          ); // Actualiza los productos filtrados
          alert('Producto eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          alert('No se pudo eliminar el producto');
        },
      });
    }
  }

  goToStore(): void {
    this.router.navigate(['/store']);
  }

  searchProducts(): void {
    this.filteredProducts = this.products.filter(
      (product) =>
        product.nombre_producto
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        product.descripcion
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
    );
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

  @HostListener('document:click', ['$event'])
  collapseSearch(event: Event): void {
    if (window.innerWidth <= 480) {
      this.isSearchExpanded = false;
    }else{
      this.isSearchExpanded = true;
    }
  }

  expandSearch(event: MouseEvent) {
    event.stopPropagation();
    this.isSearchExpanded = true;
  }
}
