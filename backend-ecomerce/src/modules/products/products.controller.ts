import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('products')
export class ProductsController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  async findAll(@Query('search') searchQuery: string): Promise<Product[]> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.usuario', 'user'); // Relaciona el producto con el usuario

    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase();
      queryBuilder.where(
        'LOWER(product.nombre_producto) LIKE :searchTerm OR ' +
          'LOWER(user.username) LIKE :searchTerm OR ' +
          'LOWER(user.fullName) LIKE :searchTerm',
        { searchTerm: `%${searchTerm}%` },
      );
    }

    return await queryBuilder.getMany();
  }

  @Get('user/:userId')
  async getProductsByUserId(
    @Param('userId') userId: number,
  ): Promise<Product[]> {
    const products = await this.productsService.getProductsByUserId(userId);
    if (products.length === 0) {
      throw new NotFoundException(
        `No products found for user with ID ${userId}`,
      );
    }
    return products;
  }

  @Get('my-products')
  @UseGuards(JwtAuthGuard)
  async getUserProducts(@Req() req): Promise<Product[]> {
    const userId = req.user.id; // Asegúrate de que este ID es un número
    return this.productsService.getProductsByUserId(userId);
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async search(@Query('nombre_producto') nombre_producto: string) {
    console.log('Searching for:', nombre_producto);
    if (!nombre_producto || nombre_producto.trim().length === 0) {
      throw new NotFoundException(
        'Please provide a valid product name to search.',
      );
    }

    const products = await this.productsService.searchByName(nombre_producto);
    if (products.length === 0) {
      throw new NotFoundException(
        `No products found matching the name "${nombre_producto}".`,
      );
    }

    return products;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto, @Req() req) {
    const userId = req.user.id;
    console.log('Datos recibidos en el backend:', createProductDto);
    return this.productsService.create(createProductDto, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req,
  ) {
    const userRole = req.user.rol;
    return this.productsService.update(id, updateProductDto, userRole);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number, @Req() req) {
    const userRole = req.user.rol;
    return this.productsService.remove(id, userRole);
  }
}
