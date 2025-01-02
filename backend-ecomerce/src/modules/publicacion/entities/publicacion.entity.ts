import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity('publicacion')
export class Publicacion {
  @PrimaryGeneratedColumn({ name: 'id_publicacion' })
  id_publicacion: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_producto' })
  producto: Product;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;

  @CreateDateColumn({ name: 'fecha_publicacion' })
  fecha_publicacion: Date;

  @Column({
    type: 'enum',
    enum: ['activa', 'inactiva'],
    default: 'activa',
    name: 'estado_publicacion',
  })
  estado_publicacion: string;
}
