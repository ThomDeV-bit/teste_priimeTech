import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import type { IUserRepository } from "../../domain/interfaces/IUserRepository.interface";
import { REPOSITORIES_TOKEN } from "../../infrastructure/database/repositories/repositories-tokens";
import "dotenv/config";
import { AuthDto } from "../../api/dtos/auth.dto";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AuthUsecase {
  constructor(
    @Inject(REPOSITORIES_TOKEN.USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    private readonly jwtToken: JwtService,
    @Inject("AUDIT_SERVICE")
    private readonly auditLogService: ClientProxy
  ) {}

  async login(user: AuthDto, ip : string) {
    const userExist = await this.userRepository.findByEmail(user.email);

    if (!userExist) throw new UnauthorizedException("Usuario invalido");

    const validPassword = await compare(user.password, userExist.password);

    if (!validPassword)
      throw new UnauthorizedException("Email e senha incorretos.");

    const payload = {
      id: userExist.id,
      email: userExist.email,
      profile: userExist.profile,
    };

    this.auditLogService.emit("audit_log", {userId: userExist.id, ip : ip , userName: userExist.name});

    return {
      access_token: await this.jwtToken.signAsync(payload),
      refresh_token: await this.jwtToken.signAsync(payload, {
        expiresIn: Number(process.env.JWT_EXPIRE_IN) * 24,
      }),
      token_type: "Bearer",
      expires_in: Number(process.env.JWT_EXPIRE_IN),
    };
  }
}
