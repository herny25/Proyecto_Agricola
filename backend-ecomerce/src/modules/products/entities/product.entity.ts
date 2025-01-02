import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Review } from '../../reviews/entities/reviews.entity';

@Entity('productos')
@Index('nombre_producto_idx', ['nombre_producto'])
export class Product {
  @PrimaryGeneratedColumn({ name: 'id_producto' })
  id: number;

  @Column({ type: 'varchar', length: 100, name: 'nombre_producto' })
  nombre_producto: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'date', name: 'fecha_publicacion' })
  fecha_publicacion: Date;

  @Column({ type: 'text', nullable: true })
  imagen: string;

  @Column({
    type: 'enum',
    enum: ['activa', 'inactiva'],
    default: 'activa',
    name: 'estado_publicacion',
  })
  estado_publicacion: string;

  @ManyToOne(() => User, (user) => user.productos, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_usuario' }) // Relaciona este campo con la tabla `usuario`
  usuario: User;

  @OneToMany(() => Review, (review) => review.producto)
  reviews: Review[];
}
