import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-reviews.dto';
import { UpdateReviewDto } from './dto/update-reviews.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    console.log(createReviewDto);
    return this.reviewsService.create(createReviewDto);
  }

  @Get(':id_producto')
  findByProduct(@Param('id_producto') id_producto: number) {
    return this.reviewsService.findByProduct(id_producto);
  }

  @Get('user/:id_usuario')
  findByUser(@Param('id_usuario') id_usuario: number) {
    return this.reviewsService.findByUser(id_usuario);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Get('/average/:id_usuario')
  async getAverageRating(@Param('id_usuario') id_usuario: number) {
    const average =
      await this.reviewsService.getAverageRatingByUser(id_usuario);
    return { average };
  }

  @Delete('product/:id_producto')
  removeByProduct(@Param('id_producto') id_producto: number) {
    return this.reviewsService.remove(id_producto);
  }

  @Get('/average-seller/:id_usuario')
  async getAverageRatingBySeller(@Param('id_usuario') id_usuario: number) {
    const average =
      await this.reviewsService.getAverageRatingBySeller(id_usuario);
    return { average };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reviewsService.remove(id);
  }
}
