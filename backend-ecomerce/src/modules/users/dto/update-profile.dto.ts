import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  MaxLength,
} from 'class-validator';
import { Sexo } from '../entities/user.entity';
export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  fullName: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  username: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  municipio?: string;

  @IsString()
  @IsOptional()
  @MaxLength(15)
  celular?: string;

  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  password: string;

  @IsEnum(Sexo)
  @IsOptional()
  sexo?: Sexo;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  img: string;
}
