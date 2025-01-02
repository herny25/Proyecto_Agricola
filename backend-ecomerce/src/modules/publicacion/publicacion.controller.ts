import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';

@Controller('publicacion')
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

  @Post()
  create(@Body() createPublicacionDto: CreatePublicacionDto) {
    return this.publicacionService.create(createPublicacionDto);
  }

  @Get()
  findAll() {
    return this.publicacionService.findAll();
  }

  @Get('/usuario/:id')
  findByUser(@Param('id') userId: number) {
    return this.publicacionService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.publicacionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePublicacionDto: UpdatePublicacionDto,
  ) {
    return this.publicacionService.update(id, updatePublicacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.publicacionService.remove(id);
  }

  @Get('/activas')
  findAllActive() {
    return this.publicacionService.findAllActive();
  }
}
