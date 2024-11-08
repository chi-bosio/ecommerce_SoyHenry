import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsStrongPassword,
  IsNumber,
  IsDateString,
  IsAlpha,
} from 'class-validator';

/**
 * DTO (Data Transfer Object) para crear un nuevo usuario.
 * Define los datos requeridos para el registro de usuario en el sistema.
 */
export class CreateUserDto {
  /**
   * Nombre completo del usuario.
   * Requiere entre 3 y 80 caracteres.
   *
   * @example 'Chiara Bosio'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @IsAlpha()
  name: string;

  /**
   * Correo electrónico del usuario en formato válido.
   *
   * @example 'cbosio@gmail.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Contraseña del usuario con una longitud mínima de 8 caracteres,
   * incluyendo letras mayúsculas, minúsculas, números y símbolos.
   *
   * @example 'Chii123.'
   */
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MaxLength(15)
  password: string;

  /**
   * Confirmación de la contraseña.
   * Debe coincidir con la contraseña ingresada.
   *
   * @example 'Chii123.'
   */
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  /**
   * Número de teléfono del usuario.
   *
   * @example 324235346
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * País de residencia del usuario.
   *
   * @example 'Argentina'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  /**
   * Dirección física del usuario.
   *
   * @example 'Calle 123'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Ciudad de residencia del usuario.
   *
   * @example 'Córdoba'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  /**
   * Fecha de nacimiento del usuario en formato ISO.
   *
   * @example '2005-06-13'
   */
  @IsNotEmpty()
  @IsDateString()
  birthdate: string;
}
