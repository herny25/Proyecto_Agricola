import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @IsNotEmpty()
  id_usuario: number;

  @IsInt()
  @IsNotEmpty()
  id_producto: number;

  @IsInt()
  @Min(1)
  @Max(5)
  puntuacion: number;

  @IsString()
  @IsOptional()
  comentario: string;
}
