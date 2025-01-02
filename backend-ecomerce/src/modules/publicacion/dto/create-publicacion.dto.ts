import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePublicacionDto {
  @IsInt()
  @IsNotEmpty()
  id_producto: number;

  @IsInt()
  @IsNotEmpty()
  id_usuario: number;

  @IsEnum(['activa', 'inactiva'])
  estado_publicacion: string;
}
