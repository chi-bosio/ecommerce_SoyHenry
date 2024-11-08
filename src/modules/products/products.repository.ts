import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Repository } from 'typeorm';
import { Categories } from '../categories/entities/categories.entity';
import * as data from '../../utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    if (page <= 0 || limit <= 0) {
      throw new BadRequestException(
        'La página y el límite deben ser mayores que 0',
      );
    }

    const products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (startIndex >= products.length) {
      throw new NotFoundException('No se encontraron productos en esta página');
    }

    return products.slice(startIndex, endIndex);
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async createProduct() {
    if (!data || data.length === 0) {
      throw new BadRequestException('No se proporcionaron datos de productos');
    }

    for (const element of data) {
      const category = await this.categoriesRepository.findOneBy({
        name: element.category,
      });

      if (!category) {
        throw new NotFoundException(
          `Categoría ${element.category} no encontrada. Asegúrate de que todas las categorías necesarias existen antes de crear productos.`,
        );
      }
    }

    await Promise.all(
      data.map(async (element) => {
        const existingProduct = await this.productsRepository.findOneBy({
          name: element.name,
        });

        if (existingProduct) {
          throw new ConflictException(`El producto ${element.name} ya existe`);
        }

        const category = await this.categoriesRepository.findOneBy({
          name: element.category,
        });

        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.imgUrl = element.imgUrl;
        product.category = category;

        try {
          await this.productsRepository
            .createQueryBuilder()
            .insert()
            .into(Products)
            .values(product)
            .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
            .execute();
        } catch (error) {
          throw new InternalServerErrorException(
            `Error al insertar el producto ${element.name}: ${error}`,
          );
        }
      }),
    );

    return 'Productos agregados con éxito';
  }

  async updateProductById(id: string, productData: Partial<Products>) {
    const existingProduct = await this.productsRepository.findOneBy({ id });

    if (!existingProduct) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    const { name } = productData;
    if (name) {
      if (name === existingProduct.name) {
        throw new ConflictException('Nombre de producto existente');
      }
      const existingName = await this.productsRepository.findOne({
        where: { name },
        select: ['id'],
      });
      if (existingName) {
        throw new ConflictException('Nombre de producto existente');
      }
    }

    await this.productsRepository.update(id, productData);

    return await this.productsRepository.findOneBy({ id });
  }

  async deleteProductById(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    try {
      await this.productsRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al eliminar el producto: ${error.message}`,
      );
    }

    return `Producto con ID ${id} eliminado con éxito`;
  }
}
