import {
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsEnum,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  nombre_producto?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsDateString()
  fecha_publicacion?: Date;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsEnum(['activa', 'inactiva'])
  @IsOptional()
  estado_publicacion?: string;
}
