import { Inject, Injectable } from "@nestjs/common";
import type { IProfileRepository } from "../../domain/interfaces/IProfileRepository.interface";
import { REPOSITORIES_TOKEN } from "../../infrastructure/database/repositories/repositories-tokens";
import { ProfileDTO } from "../../api/dtos/profile.dto";

@Injectable()


export class ProfileUsecase {
    constructor(
        @Inject(REPOSITORIES_TOKEN.PROFILE_REPOSITORY_TOKEN)
        private readonly profileRepository : IProfileRepository
    ){}


    async create(profile: ProfileDTO) {
        return await this.profileRepository.create(profile)
    }
}
