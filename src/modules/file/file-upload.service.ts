import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../products/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }

    const respone = await this.fileUploadRepository.uploadImage(file);
    if (!respone.secure_url) {
      throw new NotFoundException('Error al cargar la imagen a Cloudinary');
    }

    await this.productsRepository.update(productId, {
      imgUrl: respone.secure_url,
    });

    return await this.productsRepository.findOneBy({ id: productId });
  }
}
