import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-posts-page.component.html',
  styleUrls: ['./create-posts-page.component.css']
})
export class CreatePostsPageComponent {
  @ViewChild('productForm') productForm!: NgForm;
  isSubmitting: boolean = false;
  userID: number = 0;
  previewImage: string | ArrayBuffer | null = null;
  base64Image: string = '';
  user: any = {};

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getUserData().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.base64Image = reader.result.toString(); // Guardar la imagen en Base64
          this.previewImage = reader.result; // Mostrar la vista previa
        }
      };
      reader.readAsDataURL(file); // Convertir el archivo a Base64
    }
  }

  submitProduct(): void {
    if (!this.productForm.valid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true; // Desactiva el botón
    const productData = {
      imagen: this.base64Image,
      nombre_producto: (document.getElementById('product-name') as HTMLInputElement).value,
      precio: parseFloat((document.getElementById('product-price') as HTMLInputElement).value),
      descripcion: (document.getElementById('product-description') as HTMLTextAreaElement).value,
      fecha_publicacion: new Date().toISOString(),
      id_usuario: this.userID,
    };

    this.productService.createProduct(productData).subscribe({
      next: (createdProduct) => {
        alert('Producto creado con éxito');
        this.isSubmitting = false; // Reactiva el botón
        this.router.navigate(['/myposts']);
      },
      error: (error) => {
        console.error('Error al crear el producto:', error);
        this.isSubmitting = false; // Reactiva el botón en caso de error
      },
    });
  }

  goToStore(): void {
    this.router.navigate(['/store']);
  }
}
