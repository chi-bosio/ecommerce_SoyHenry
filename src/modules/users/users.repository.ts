import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    if (page <= 0 || limit <= 0) {
      throw new BadRequestException(
        'La página y el limite deben ser mayores que 0',
      );
    }

    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });

    if (!users || users.length === 0) {
      throw new BadRequestException(
        'No se encontraron usuarios en esta página',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...restUser }) => restUser);
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, isAdmin, ...restUser } = user;
    return restUser;
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async createUser(userData: Partial<Users>): Promise<Partial<Users>> {
    const existingUser = await this.usersRepository.findOneBy({
      email: userData.email,
    });
    if (existingUser) {
      throw new ConflictException(
        `El correo electrónico ${userData.email} ya está registrado`,
      );
    }

    const user = await this.usersRepository.save({
      ...userData,
      isAdmin: false,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restUser } = user;
    return restUser;
  }

  async updateUserById(id: string, updatedUserData: Partial<Users>) {
    const existingUser = await this.usersRepository.findOneBy({ id });
    if (!existingUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (updatedUserData.password) {
      const hashedPassword = await bcrypt.hash(updatedUserData.password, 10);

      if (!hashedPassword) {
        throw new BadRequestException('Error al hashear la contraseña');
      }
      updatedUserData.password = hashedPassword;
    }

    await this.usersRepository.update(id, updatedUserData);
    const updateUser = await this.usersRepository.findOneBy({ id });

    const { password, isAdmin, ...restUser } = updateUser;
    return restUser;
  }

  async deleteUserById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    await this.usersRepository.delete(id);
    return `Usuario con ID ${id} eliminado con éxito`;
  }

  async makeUserAdmin(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    user.isAdmin = true;
    await this.usersRepository.save(user);

    const { password, ...restUser } = user;
    return restUser;
  }
}
