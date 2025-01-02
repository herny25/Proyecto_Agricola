import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductsByUserId(userId: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { usuario: { id: userId } },
    });
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['usuario', 'reviews'],
    });
  }

  async create(
    createProductDto: CreateProductDto,
    userId: number,
  ): Promise<Product> {
    // Busca el usuario en la base de datos
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Crea el producto y establece la relación con el usuario
    const product = this.productRepository.create({
      ...createProductDto,
      usuario: user, // Relaciona el producto con el usuario
    });

    // Guarda el producto en la base de datos
    return this.productRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    userRole: string,
  ): Promise<Product> {
    if (userRole !== 'vendedor' && userRole !== 'admin') {
      throw new ForbiddenException(
        'Only "vendedor" or "admin" role can delete products',
      );
    }
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number, userRole: string): Promise<void> {
    if (userRole !== 'vendedor' && userRole !== 'admin') {
      throw new ForbiddenException(
        'Only "vendedor" or "admin" role can delete products',
      );
    }
    await this.productRepository.delete(id);
  }

  async searchByName(nombre_producto: string): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        nombre_producto: Like(`%${nombre_producto}%`),
      },
    });
  }
}
