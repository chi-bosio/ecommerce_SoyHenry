import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enum/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAuth() {
    return 'Autenticación exitosa';
  }

  async signUpUser(user: CreateUserDto) {
    const { email, password, confirmPassword, ...otherDetails } = user;

    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const dbUser = await this.usersRepository.getUserByEmail(email);
    if (dbUser) {
      throw new BadRequestException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Error al hashear la contraseña');
    }

    const newUser = await this.usersRepository.createUser({
      ...otherDetails,
      email,
      password: hashedPassword,
    });

    const { password: _password, ...userWithoutPassword } = newUser;

    return {
      success: 'Usuario creado con éxito!',
      user: userWithoutPassword,
    };
  }

  async signInUser(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email y password son requeridos');
    }

    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = {
      userId: user.id,
      email: user.email,
      roles: user.isAdmin ? [Role.Admin] : [Role.User],
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: { email: user.email, name: user.name, id: user.id },
    };
  }
}
