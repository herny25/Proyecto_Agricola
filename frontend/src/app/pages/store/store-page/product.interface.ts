
export interface Product {
  id: number;
  nombre_producto: string;
  descripcion: string;
  precio: number;
  imagen: string;
  estado_publicacion: string;
  usuario?: {
    id: number;
    username: string;
    fullName: string;
    celular?: string;
  };
}
