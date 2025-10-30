import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiProperty, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../../dtos/user.dto";
import { AuthGuard } from "apps/api/src/common/guards/auth.guards";
import { Roles } from "apps/api/src/common/guards/roles/roles.decorator";
import { Role } from "apps/api/src/common/guards/roles/roles.enum";
import { UserUsecase } from "apps/api/src/use-cases/user/user.use-case";


@ApiTags("user")
@Controller("user")
@ApiSecurity('JWT-auth')
export class UserController {
  constructor(private readonly userUsecase: UserUsecase) {}

  @ApiProperty({
    description: "Endpoint para criação de usuarios.",
  })
  @Post("register")
  async create(@Body() user: UserDto): Promise<{ message: string }> {
    try {
      await this.userUsecase.createUser(user);
      return { message: "Usuário criado com sucesso." };
    } catch (error) {
      throw error;
    }
  }

  @ApiProperty({
    name : "Listar Usuários",
    description: "Endpoint para listagem de usuarios.",
  })
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get("")
  async get() {
    try {
      return await this.userUsecase.getUsers();
    } catch (error) {
      throw error;
    }
  }
}
