import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * DTO (Data Transfer Object) para actualizar la información de un usuario.
 * Define los datos opcionales que pueden ser actualizados en el sistema.
 */
export class UpdateUserDto {
  /**
   * Nombre completo del usuario.
   * Debe tener entre 3 y 80 caracteres.
   *
   * @example 'Chiara Bosio'
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name?: string;

  /**
   * Correo electrónico del usuario en formato válido.
   *
   * @example 'cbosio@gmail.com'
   */
  @IsOptional()
  @IsEmail()
  email?: string;

  /**
   * Contraseña del usuario con requisitos de seguridad.
   * Longitud mínima de 8 caracteres, incluyendo letras mayúsculas, minúsculas, números y símbolos.
   *
   * @example 'Chii123.'
   */
  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MaxLength(15)
  password?: string;

  /**
   * Número de teléfono del usuario.
   *
   * @example 324235346
   */
  @IsOptional()
  @IsNumber()
  phone?: number;

  /**
   * País de residencia del usuario.
   * Debe tener entre 4 y 20 caracteres.
   *
   * @example 'Argentina'
   */
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  country?: string;

  /**
   * Dirección física del usuario, como calle y número.
   * Debe tener entre 3 y 80 caracteres.
   *
   * @example 'Calle 123'
   */
  @IsOptional()
  @MinLength(3)
  @MaxLength(80)
  address?: string;

  /**
   * Ciudad de residencia del usuario.
   * Debe tener entre 5 y 20 caracteres.
   *
   * @example 'Córdoba'
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city?: string;
}
