import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener las categorías' })
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @ApiOperation({ summary: 'Cargar categorías' })
  @Get('seeder')
  addCategories() {
    return this.categoriesService.addCategories();
  }
}
