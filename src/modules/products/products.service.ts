import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    return this.productsRepository.getProducts(page, limit);
  }

  getProductById(id: string) {
    return this.productsRepository.getProductById(id);
  }

  async createProduct() {
    return this.productsRepository.createProduct();
  }

  async updateProductById(id: string, productData: Partial<Products>) {
    return this.productsRepository.updateProductById(id, productData);
  }

  async deleteProductById(id: string) {
    return this.productsRepository.deleteProductById(id);
  }
}
