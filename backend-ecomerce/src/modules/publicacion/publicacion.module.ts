import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { Publicacion } from './entities/publicacion.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publicacion, Product, User])],
  controllers: [PublicacionController],
  providers: [PublicacionService],
})
export class PublicacionModule {}
