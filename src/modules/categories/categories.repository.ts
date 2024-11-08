import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    const categories = await this.categoriesRepository.find();
    if (!categories.length) {
      throw new NotFoundException('No se encontraron categorias');
    }
    return categories;
  }

  async addCategories() {
    const uniqueCategories = [
      ...new Set(data.map((element) => element.category)),
    ];

    const promises = uniqueCategories.map(async (category) => {
      const existingCategory = await this.categoriesRepository.findOne({
        where: { name: category },
      });
      if (!existingCategory) {
        return this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Categories)
          .values({ name: category })
          .execute();
      } else {
        throw new ConflictException(`La categoría ${category} ya existe`);
      }
    });

    await Promise.all(promises);
    return 'Categorias agregadas con éxito';
  }
}
