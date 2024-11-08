import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dtos/CreateUser.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {
  /**
   * Email del usuario que está intentando iniciar sesión.
   * @example 'cbosio@gmail.com'
   */
  @ApiProperty({
    example: 'cbosio@gmail.com',
    description: 'Email del usuario que está intentando iniciar sesión',
  })
  email: string;

  /**
   * Contraseña del usuario.
   * @example 'Chii123.'
   */
  @ApiProperty({
    example: 'Chii123.',
    description: 'Contraseña del usuario',
  })
  password: string;
}
