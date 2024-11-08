import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Products } from './entities/products.entity';
import { NotFoundException } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProduct: Products = {
    id: '1',
    name: 'Product 1',
    description: 'Description for product 1',
    price: 100,
    stock: 10,
    imgUrl: 'http://example.com/image.png',
    category: null,
    orderDetails: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockProductsService = {
    getProductById: jest.fn().mockImplementation((id: string) => {
      if (id === '1') return Promise.resolve(mockProduct);
      else
        return Promise.reject(
          new NotFoundException(`Producto con ID ${id} no encontrado`),
        );
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
        {
          provide: AuthGuard,
          useValue: { canActivate: jest.fn(() => true) },
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProductById', () => {
    it('should return a product if found', async () => {
      const result = await controller.getProductById('1');
      expect(result).toEqual(mockProduct);
      expect(service.getProductById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if product is not found', async () => {
      await expect(controller.getProductById('2')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
