import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { NotFoundException } from '@nestjs/common';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let mockCategoriesService: Partial<CategoriesService>;

  const mockCategories = [
    {
      id: '1',
      name: 'Electronics',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Furniture',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(async () => {
    mockCategoriesService = {
      getCategories: jest.fn().mockResolvedValue(mockCategories),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CategoriesService, useValue: mockCategoriesService },
      ],
    }).compile();

    categoriesController =
      module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(categoriesController).toBeDefined();
  });

  describe('getCategories', () => {
    it('should return an array of categories', async () => {
      const result = await categoriesController.getCategories();

      expect(result).toEqual(mockCategories);
      expect(mockCategoriesService.getCategories).toHaveBeenCalled();
    });

    it('should throw an exception if no categories are found', async () => {
      jest
        .spyOn(mockCategoriesService, 'getCategories')
        .mockRejectedValue(new NotFoundException());

      await expect(categoriesController.getCategories()).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
