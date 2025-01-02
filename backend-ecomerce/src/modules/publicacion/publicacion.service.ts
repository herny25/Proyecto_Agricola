import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { Product } from '../products/entities/product.entity';
import { User, Rol } from '../users/entities/user.entity';

@Injectable()
export class PublicacionService {
  constructor(
    @InjectRepository(Publicacion)
    private publicacionRepository: Repository<Publicacion>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createPublicacionDto: CreatePublicacionDto) {
    const { id_producto, id_usuario, estado_publicacion } =
      createPublicacionDto;

    const product = await this.productRepository.findOne({
      where: { id: id_producto },
    });
    if (!product) throw new NotFoundException('Producto no encontrado');

    const user = await this.userRepository.findOne({
      where: { id: id_usuario, rol: Rol.VENDEDOR },
    });
    if (!user)
      throw new NotFoundException('Usuario no encontrado o no es un vendedor');

    const publicacion = this.publicacionRepository.create({
      producto: product,
      usuario: user,
      estado_publicacion,
    });
    return this.publicacionRepository.save(publicacion);
  }

  async update(
    id_publicacion: number,
    updatePublicacionDto: UpdatePublicacionDto,
  ) {
    const publicacion = await this.publicacionRepository.findOne({
      where: { id_publicacion },
    });
    if (!publicacion) throw new NotFoundException('Publicación no encontrada');

    if (updatePublicacionDto.estado_publicacion) {
      publicacion.estado_publicacion = updatePublicacionDto.estado_publicacion;
    }
    return this.publicacionRepository.save(publicacion);
  }

  async findAll() {
    return this.publicacionRepository.find({
      relations: ['producto', 'usuario'],
    });
  }

  async findOne(id_publicacion: number) {
    const publicacion = await this.publicacionRepository.findOne({
      where: { id_publicacion },
      relations: ['producto', 'usuario'],
    });
    if (!publicacion) throw new NotFoundException('Publicación no encontrada');
    return publicacion;
  }

  async remove(id: number) {
    const result = await this.publicacionRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Publicación no encontrada');
    return result;
  }

  async findByUser(userId: number) {
    const publicaciones = await this.publicacionRepository.find({
      where: { usuario: { id: userId } },
      relations: ['producto', 'usuario'],
    });

    if (!publicaciones.length) {
      throw new NotFoundException(
        'No se encontraron publicaciones para este usuario',
      );
    }

    return publicaciones;
  }

  async findAllActive() {
    return this.publicacionRepository.find({
      where: { estado_publicacion: 'activa' },
      relations: ['producto', 'usuario'],
    });
  }
}
