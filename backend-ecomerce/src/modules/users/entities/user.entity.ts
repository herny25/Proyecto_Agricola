import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from '../../reviews/entities/reviews.entity';
import { Product } from '../../products/entities/product.entity';

export enum Sexo {
  MASCULINO = 'masculino',
  FEMENINO = 'femenino',
  OTRO = 'otro',
}

export enum Rol {
  VENDEDOR = 'vendedor',
  CLIENTE = 'cliente',
  ADMINISTRADOR = 'admin',
}

@Entity('usuario')
export class User {
  @PrimaryGeneratedColumn('increment', { name: 'id_usuario' })
  id: number;

  @Column({
    name: 'nombre_completo',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  fullName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  municipio: string;

  @Column({ type: 'enum', enum: Sexo, nullable: true })
  sexo: Sexo;

  @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
  birthDate: Date;

  @Column({
    name: 'nombre_usuario',
    type: 'varchar',
    length: 50,
    nullable: true,
    unique: true,
    default: '',
  })
  username: string;

  @Column({ name: 'contrasena', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  celular: string;

  @Column({ type: 'enum', enum: Rol, nullable: false })
  rol: Rol;

  @Column({ type: 'text', nullable: true })
  img: string;

  @Column({
    name: 'correo_electronico',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ name: 'reset_token', type: 'varchar', nullable: true })
  resetToken: string | null;

  @Column({ name: 'reset_token_expires', type: 'timestamp', nullable: true })
  resetTokenExpires: Date | null;

  @OneToMany(() => Product, (product) => product.usuario)
  productos: Product[];
  @OneToMany(() => Review, (review) => review.usuario)
  reviews: Review[];
  products: any;
}
