import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService: Partial<AuthService>;

  const mockUser: CreateUserDto = {
    name: 'Juancito',
    email: 'jcorrea@gmail.com',
    password: 'Juan123.',
    confirmPassword: 'Juan123.',
    phone: 123456789,
    country: 'Argentina',
    address: 'Calle 123',
    city: 'Córdoba',
    isAdmin: false,
  };

  const mockLoginCredentials: LoginUserDto = {
    email: 'jcorrea@gmail.com',
    password: 'Juan123.',
  };

  beforeEach(async () => {
    mockAuthService = {
      signUpUser: jest.fn((user: CreateUserDto) => {
        if (user.password !== user.confirmPassword) {
          throw new BadRequestException('Password do not match');
        }
        return Promise.resolve({
          success: 'Usuario creado con éxito!',
          user: { ...user, password: undefined },
        });
      }),
      signInUser: jest.fn().mockResolvedValue({
        accessToken: 'mockedToken',
        user: { email: mockUser.email, name: mockUser.name },
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should create an instance of AuthCOntroller', () => {
    expect(authController).toBeDefined();
  });

  it('signUpUser() should call signUpUser and return the user', async () => {
    const result = await authController.signUpUser(mockUser);

    expect(result).toBeDefined();
    expect(result.success).toEqual('Usuario creado con éxito!');
    expect(mockAuthService.signUpUser).toHaveBeenCalledWith(mockUser);
  });

  it('signUpUser() should throw an error if passwords do not match', async () => {
    const userWithMismatchedPasswords = {
      ...mockUser,
      confirmPassword: 'differentPassword',
    };

    await expect(
      authController.signUpUser(userWithMismatchedPasswords),
    ).rejects.toThrow(BadRequestException);
  });

  it('signInUser() should call signInUser and return a token', async () => {
    const result = await authController.signInUser(mockLoginCredentials);
    expect(result).toBeDefined();
    expect(result.accessToken).toEqual('mockedToken');
    expect(mockAuthService.signInUser).toHaveBeenCalledWith(
      mockLoginCredentials.email,
      mockLoginCredentials.password,
    );
  });

  it('signInUser() should throw an error if credentials are invalid', async () => {
    mockAuthService.signInUser = jest
      .fn()
      .mockRejectedValue(
        new BadRequestException('Email y password son requeridos'),
      );

    await expect(
      authController.signInUser({ email: '', password: '' }),
    ).rejects.toThrow(BadRequestException);
  });
});
