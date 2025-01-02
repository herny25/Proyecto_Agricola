import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsDateString,
  IsEnum,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  nombre_producto: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @IsDateString()
  fecha_publicacion: Date;

  @IsString()
  imagen?: string;

  @IsNotEmpty()
  id_usuario: number;

  @IsEnum(['activa', 'inactiva'])
  estado_publicacion: string;
}
