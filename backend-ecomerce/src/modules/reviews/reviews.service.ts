import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/reviews.entity';
import { CreateReviewDto } from './dto/create-reviews.dto';
import { UpdateReviewDto } from './dto/update-reviews.dto';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const { id_usuario, id_producto, puntuacion, comentario } = createReviewDto;

    const user = await this.userRepository.findOne({
      where: { id: id_usuario },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const product = await this.productRepository.findOne({
      where: { id: id_producto },
      relations: ['usuario'],
    });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const review = this.reviewRepository.create({
      usuario: user,
      producto: product,
      puntuacion,
      comentario,
      fecha_valoracion: new Date(),
    });

    return this.reviewRepository.save(review);
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne({
      where: { id_valoracion: id },
    });
    if (!review) {
      throw new NotFoundException('Valoración no encontrada');
    }

    await this.reviewRepository.update(id, updateReviewDto);
    return this.reviewRepository.findOne({ where: { id_valoracion: id } });
  }

  async findByProduct(id_producto: number) {
    return this.reviewRepository.find({
      where: { producto: { id: id_producto } },
      relations: ['usuario'],
    });
  }

  async findByUser(id_usuario: number) {
    return this.reviewRepository.find({
      where: { usuario: { id: id_usuario } },
      relations: ['producto'],
    });
  }

  async getAverageRatingByUser(userId: number): Promise<number> {
    const reviews = await this.reviewRepository.find({
      where: { usuario: { id: userId } },
    });

    if (reviews.length === 0) {
      return 0; // Retornar 0 si no hay reseñas
    }

    const totalScore = reviews.reduce(
      (sum, review) => sum + review.puntuacion,
      0,
    );
    return totalScore / reviews.length;
  }

  async remove(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}
