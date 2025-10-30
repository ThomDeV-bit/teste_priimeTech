import { ConflictException, Inject, Injectable, Type } from "@nestjs/common";
import bcrypt from "bcrypt";
import { UserDto } from "../../api/dtos/user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import type { IUserRepository } from "../../domain/interfaces/IUserRepository.interface";
import { REPOSITORIES_TOKEN } from "../../infrastructure/database/repositories/repositories-tokens";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class UserUsecase {
  constructor(
    @Inject(REPOSITORIES_TOKEN.USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(user: UserDto): Promise<boolean> {
    try {
      const userExist = await this.userRepository.findByEmail(user.email);

      if (userExist) throw new ConflictException("Email já cadastrasdo.");

      user.password = await bcrypt.hash(user.password, 10);

      await this.userRepository.create(user);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.findUsers();
  }
}
