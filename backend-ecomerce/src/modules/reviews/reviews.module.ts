import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/reviews.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Product, User])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
