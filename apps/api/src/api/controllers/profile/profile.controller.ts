import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { ProfileUsecase } from "apps/api/src/use-cases/profile/profile.use-case";
import { PinoLogger } from "nestjs-pino";
import { ProfileDTO } from "../../dtos/profile.dto";

@Controller("profile")
@ApiTags("profile")
export class ProfileController {
  constructor(
    private readonly logger: PinoLogger,
    private readonly profileUsecase: ProfileUsecase
  ) {}

  @Post("create")
  @ApiProperty()
  async create(@Body() profile: ProfileDTO) {
    try {
      await this.profileUsecase.create(profile);

      this.logger.info(`Perfil ${profile.role} criado com sucesso`);

      return {message : `Perfil ${profile.role} criado com sucesso`};
    } catch (error) {
      this.logger.error(`${error?.message}`);
      throw error;
    }
  }


  @Get()
  @ApiProperty()
  async getProfiles(){
    return await this.profileUsecase.getProfiles()
  }
}
