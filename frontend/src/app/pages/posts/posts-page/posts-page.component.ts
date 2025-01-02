import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.css'
})
export class PostsPageComponent implements OnInit{
  product: any = {};
  usuariotoken: any = {}
  usuario: any = {};
  isModalOpen: boolean = false;
  showModal: boolean = false;
  userProducts: any[] = [];
  averageRating: number = 0;
  isAdmin: boolean = false;
  reviews: any[] = [];
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getUserData().subscribe({
      next: (data) => {
        this.usuariotoken = data;
        this.route.paramMap.subscribe((params) => {
          const productId = Number(params.get('id'));
          if (productId) {
            this.loadProduct(productId);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });

    this.route.paramMap.subscribe((params) => {
      const productId = Number(params.get('id'));
      if (productId) {
        this.loadProduct(productId);
      }
    });

    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productService.getProductById(+productId).subscribe({
        next: (data) => {
          this.product = data;

          this.usuario = data.usuario;
          this.isAdmin = this.usuariotoken?.rol === 'admin';

          this.isOwner = this.usuariotoken?.id === this.usuario?.id;

          this.productService.getAverageRatingByUser(this.usuario.id).subscribe({
            next: (response) => {
              this.averageRating = response.average;


            },
            error: (err) => {
              console.error('Error al cargar promedio de reseñas:', err);
            },
          });

          // Una vez que tenemos los datos del producto, obtenemos los productos del usuario
          if (this.usuario && this.usuario.id) {
            this.getProductsForUser(this.usuario.id); // Llamamos a la función para obtener los productos del usuario
          }
        },
        error: (error) => {
          console.error('Error al cargar el producto:', error);
        },
      });
    } else {
      console.error('No se encontró el ID del producto');
    }
  }

  getProductsForUser(userId: number): void {
    this.productService.getProductsByUserId(userId).subscribe({
      next: (data) => {
        this.userProducts = data;
      },
      error: (error) => {
        console.error('Error al obtener los productos del usuario:', error);
      }
    });
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (data) => {
        this.product = data;

        this.usuario = data.usuario;

        if (this.usuario && this.usuario.id) {
          this.getProductsForUser(this.usuario.id);
        }

        if (this.product && this.product.id) {
          this.loadReviews();
        }

      },
      error: (error) => {
        console.error('Error al cargar el producto:', error);
      },
    });
  }

  sendMessage(): void {
    if (this.usuario && this.usuario.celular) {
      const celular = this.usuario.celular;
      const whatsappUrl = `https://wa.me/${celular}`;
      window.open(whatsappUrl, '_blank');
    } else {
      console.error('No se encontró el número de celular del usuario');
    }
  }

  goToStore(): void {
    this.router.navigate(['/store']);
  }

  checkProfile(): void {
    if (!this.productService.isAuthenticated()) {
      this.showModal = true;
    } else {
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

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  // Método para cerrar el modal
  closeModalu(): void {
    this.showModal = false;
  }

  closeModalOutside(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  loadReviews() {
    this.productService.getReviewsByProduct(this.product.id).subscribe(
      (response) => {
        this.reviews = response;
        console.log("responde:"+this.reviews);
      },
      (error) => {
        console.error('Error al cargar reseñas:', error);
      }
    );
  }

  deleteReview(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
      this.productService.deleteReview(id).subscribe(() => {
        // Eliminar la reseña de la lista en el frontend después de la eliminación
        this.reviews = this.reviews.filter((review) => review.id_valoracion !== id);
      });
    }
  }

  submitReview(form: NgForm) {
    if (!this.productService.isAuthenticated()) {
      alert('Debe iniciar sesión para enviar una reseña');
      return;
    }
    if(this.usuario.fullName == this.usuariotoken.fullName){
      alert('No puede dejar una reseña siendo propietario del producto');
      return;
    }
    const reviewData = {
      id_usuario: this.usuariotoken.id,
      id_producto: this.product.id,
      puntuacion: form.value.puntuacion,
      comentario: form.value.comentario,
    };

    console.log(reviewData);

    this.productService.createReview(reviewData).subscribe(
      (response) => {
        alert('Reseña enviada con éxito.');
        form.reset();
        this.loadReviews();
      },
      (error) => {
        console.error('Error al enviar la reseña:', error);
        alert('No se pudo enviar la reseña.');
      }
    );
  }
}
