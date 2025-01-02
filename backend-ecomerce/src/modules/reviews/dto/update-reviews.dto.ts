import { IsOptional, IsString, Min, Max, IsInt } from 'class-validator';

export class UpdateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  puntuacion?: number;

  @IsString()
  @IsOptional()
  comentario?: string;
}
