import { IsEnum, IsOptional } from 'class-validator';

export class UpdatePublicacionDto {
  @IsEnum(['activa', 'inactiva'])
  @IsOptional()
  estado_publicacion?: string;
}
