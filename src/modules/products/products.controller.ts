import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enum/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Número de página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Productos por página',
  })
  @ApiOperation({ summary: 'Obtener listado de productos' })
  @HttpCode(200)
  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) {
      return this.productsService.getProducts(Number(page), Number(limit));
    }
    return this.productsService.getProducts(1, 5);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear productos' })
  @HttpCode(201)
  @Get('seeder')
  @UseGuards(AuthGuard)
  async createProduct() {
    return this.productsService.createProduct();
  }

  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @HttpCode(200)
  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiBearerAuth()
  @HttpCode(200)
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProductById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productData: UpdateProductDto,
  ) {
    const messageUpdated = await this.productsService.updateProductById(
      id,
      productData,
    );
    return { message: messageUpdated };
  }

  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiBearerAuth()
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProductById(@Param('id', ParseUUIDPipe) id: string) {
    const messageDeleted = await this.productsService.deleteProductById(id);
    return { message: messageDeleted };
  }
}
