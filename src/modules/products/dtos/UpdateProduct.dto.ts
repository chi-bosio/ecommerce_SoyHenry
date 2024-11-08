import {
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  /**
   * Nombre del producto, que debe ser único. Este campo es opcional y tiene un límite de 50 caracteres.
   * @example 'Camiseta Deportiva'
   */
  @IsOptional()
  @IsString()
  @MinLength(1) // Aseguramos que al menos haya un carácter
  @MaxLength(50)
  name?: string;

  /**
   * Descripción detallada del producto. Este campo es opcional.
   * @example 'Camiseta deportiva 100% poliéster, de secado rápido y cómoda para cualquier actividad física.'
   */
  @IsOptional()
  @IsString()
  @MaxLength(255) // Limitar la descripción a 255 caracteres
  description?: string;

  /**
   * Precio del producto. Este campo es opcional.
   * @example 25.99
   */
  @IsOptional()
  @IsDecimal()
  price?: number;

  /**
   * Cantidad de unidades disponibles en el inventario del producto. Este campo es opcional.
   * @example 150
   */
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Debe haber al menos un producto en stock' })
  stock?: number;

  /**
   * URL de la imagen del producto. Este campo es opcional.
   * @example 'https://mi-tienda.com/imagenes/camiseta-deportiva.png'
   */
  @IsOptional()
  @IsString()
  @MaxLength(255) // Limitar la longitud de la URL de la imagen
  imgUrl?: string;
}
