import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id_valoracion: number;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: 'id_producto' })
  producto: Product;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'id_usuariotoken' })
  usuario: User;

  @Column()
  puntuacion: number;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @Column()
  fecha_valoracion: Date;
}
