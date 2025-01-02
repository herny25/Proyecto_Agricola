import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  MaxLength,
} from 'class-validator';
import { Sexo, Rol } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  fullName: string;

  @IsString()
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
  @MaxLength(255)
  password: string;

  @IsEnum(Sexo)
  @IsOptional()
  sexo?: Sexo;

  @IsEnum(Rol)
  @IsOptional()
  rol: Rol;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  img: string;
}
