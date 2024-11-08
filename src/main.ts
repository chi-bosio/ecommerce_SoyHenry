import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(loggerMiddleware);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce')
    .setDescription(
      `
      Esta API es parte de un sistema de comercio electrónico desarrollado con NestJS. Proporciona endpoints para gestionar las siguientes áreas clave:
      
      - **Auth**: Registro y autenticación de usuarios (signIn, signUp).
      - **Categories**: Gestión de categorías de productos.
      - **File**: Carga de imágenes y archivos para asociarlos a productos.
      - **Orders**: Procesamiento y manejo de pedidos de compra.
      - **Products**: Gestión del catálogo de productos, incluyendo creación, actualización y eliminación.
      - **Users**: Gestión de perfiles de usuarios, roles y preferencias.

      La API está diseñada para ser segura y escalable, ideal para integraciones de plataformas de comercio digital.
      `,
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
