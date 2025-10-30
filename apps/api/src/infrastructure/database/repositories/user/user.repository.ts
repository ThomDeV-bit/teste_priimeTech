import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "apps/api/src/api/dtos/user.dto";
import { ProfileEntity } from "apps/api/src/domain/entities/profile.entity";
import { UserEntity } from "apps/api/src/domain/entities/user.entity";

import { Repository, ReturnDocument } from "typeorm";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileEntity: Repository<ProfileEntity>
  ) {}

  async create(user: UserDto): Promise<boolean> {
    try {
      const profile = await this.profileEntity.findOne({
        where: { id: user.profile_id },
      });

      if (!profile) throw new BadRequestException("Perfil de acesso invalido");

      console.log(profile);

      const newUser = this.userEntity.create({
        ...user,
        profile: profile,
      });

      await this.userEntity.save(newUser);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      return await this.userEntity.findOneBy({ email });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUsers(): Promise<UserEntity[]> {
    return await this.userEntity.find({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        profile: true,
      },
    });
  }
}
