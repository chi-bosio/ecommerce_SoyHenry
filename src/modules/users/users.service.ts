import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  async createUser(user: Partial<Users>) {
    return this.usersRepository.createUser(user);
  }

  async updateUserById(id: string, userData: Partial<Users>) {
    return this.usersRepository.updateUserById(id, userData);
  }

  async deleteUserById(id: string) {
    return this.usersRepository.deleteUserById(id);
  }

  async makeUserAdmin(id: string) {
    return this.usersRepository.makeUserAdmin(id);
  }
}
