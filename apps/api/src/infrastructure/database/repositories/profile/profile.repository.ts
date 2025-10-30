import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileDTO } from "apps/api/src/api/dtos/profile.dto";
import { UserDto } from "apps/api/src/api/dtos/user.dto";
import { ProfileEntity } from "apps/api/src/domain/entities/profile.entity";
import { UserEntity } from "apps/api/src/domain/entities/user.entity";

import { Repository } from "typeorm";

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileEntity: Repository<ProfileEntity>,
  ) {}

  async create(profile: ProfileDTO): Promise<boolean> {
    try {
      const newProfile = this.profileEntity.create(profile)

      await this.profileEntity.save(newProfile);

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProfile(): Promise<ProfileEntity[]>{
    return await this.profileEntity.find()
  }
}
