import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @Post('signup')
  async signUpUser(@Body() user: CreateUserDto) {
    return this.authService.signUpUser(user);
  }

  @ApiOperation({ summary: 'Iniciar sesión' })
  @Post('signin')
  signInUser(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signInUser(email, password);
  }
}
