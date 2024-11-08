import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { NotFoundException } from '@nestjs/common';

describe('FileUploadController', () => {
  let fileUploadController: FileUploadController;
  let mockFileUploadService: Partial<FileUploadService>;

  const mockProduct = {
    id: '1',
    name: 'Producto de Prueba',
    imgUrl: 'http://example.com/image.jpg',
  };

  const mockFile = {
    buffer: Buffer.from('mockFileBuffer'),
    originalname: 'test-image.jpg',
    mimetype: 'image/jpeg',
    size: 150000,
  } as Express.Multer.File;

  beforeEach(async () => {
    mockFileUploadService = {
      uploadImage: jest.fn().mockResolvedValue({
        ...mockProduct,
        imgUrl: 'http://example.com/updated-image.jpg',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileUploadController],
      providers: [
        { provide: FileUploadService, useValue: mockFileUploadService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(jest.fn(() => true))
      .compile();

    fileUploadController =
      module.get<FileUploadController>(FileUploadController);
  });

  it('should be defined', () => {
    expect(fileUploadController).toBeDefined();
  });

  describe('uploadImage', () => {
    it('debería subir una imagen y retornar el producto actualizado', async () => {
      const result = await fileUploadController.uploadImage('1', mockFile);

      expect(result).toBeDefined();
      expect(result.imgUrl).toEqual('http://example.com/updated-image.jpg');
      expect(mockFileUploadService.uploadImage).toHaveBeenCalledWith(
        mockFile,
        '1',
      );
    });

    it('debería lanzar una excepción si el producto no es encontrado', async () => {
      // Simulamos que el servicio lanza NotFoundException
      jest
        .spyOn(mockFileUploadService, 'uploadImage')
        .mockRejectedValue(
          new NotFoundException('Producto con ID no encontrado'),
        );

      await expect(
        fileUploadController.uploadImage('2', mockFile),
      ).rejects.toThrow(NotFoundException);
    });

    it('debería lanzar una excepción si la imagen no se sube correctamente', async () => {
      // Simulamos que el servicio lanza un error relacionado con la subida
      jest
        .spyOn(mockFileUploadService, 'uploadImage')
        .mockRejectedValue(
          new NotFoundException('Error al cargar la imagen a Cloudinary'),
        );

      await expect(
        fileUploadController.uploadImage('1', mockFile),
      ).rejects.toThrow('Error al cargar la imagen a Cloudinary');
    });
  });
});
