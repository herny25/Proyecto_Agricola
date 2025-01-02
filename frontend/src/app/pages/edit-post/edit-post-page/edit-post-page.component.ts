import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-post-page',
  templateUrl: './edit-post-page.component.html',
  styleUrl: './edit-post-page.component.css'
})
export class EditPostPageComponent implements OnInit {
  userID: number = 0;
  productId: number = 0;
  previewImage: string | ArrayBuffer | null = null;
  base64Image: string = '';
  productData: any = {
    nombre_producto: '',
    precio: 0,
    descripcion: '',
    imagen: ''
  };
  user: any = {};

  isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getUserData().subscribe({
      next: (data) => {
        this.user = data;
        this.isAdmin = this.user?.rol === 'admin';
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });

    this.userID = this.productService.getUserID();

    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.productData = product;
        this.previewImage = product.imagen;
        this.base64Image = product.imagen;
      },
      error: (error) => {
        console.error('Error al cargar el producto:', error);
        alert('No se pudo cargar el producto.');
        this.router.navigate(['/profile']);
      }
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.base64Image = reader.result.toString();
          this.previewImage = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  submitProduct(): void {
    if (!this.base64Image) {
      alert('Por favor, selecciona una imagen');
      return;
    }

    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    const nombreProducto = (document.getElementById('product-name') as HTMLInputElement).value;
    const precio = (document.getElementById('product-price') as HTMLInputElement).value;
    const descripcion = (document.getElementById('product-description') as HTMLTextAreaElement).value;

    const productData = {
      imagen: this.base64Image,
      nombre_producto: nombreProducto,
      precio: parseFloat(precio),
      descripcion: descripcion,
    };

    this.productService.updateProduct(this.productId, productData).subscribe({
      next: (response) => {
        alert('Producto actualizado con éxito');
        if(this.isAdmin){
          this.router.navigate(['/store']);
        }else{
          this.router.navigate(['/myposts']);
        }
      },
      error: (error) => {
        console.error('Error al actualizar el producto:', error);
        alert('Error al actualizar el producto');
      },
    });
  }

  goToStore(): void {
    this.router.navigate(['/store']);
  }
}
