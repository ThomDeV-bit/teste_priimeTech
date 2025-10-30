import { Body, Controller, Post, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthUsecase } from "../../../use-cases/auth/auth.use-case";
import { PinoLogger } from "nestjs-pino";
import { AuthDto } from "../../dtos/auth.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    private readonly authUsecase: AuthUsecase,
    private readonly logger: PinoLogger
  ) {}

  @Post("login")
  async login(@Body() user: AuthDto, @Request() req) {
    try {

      let ip =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress;

      if (typeof ip === "string" && ip.includes(",")) {
        ip = ip.split(",")[0].trim();
      }

      if (ip === "::1" || ip === "::ffff:127.0.0.1") {
        ip = "127.0.0.1";
      }

      req.user = await this.authUsecase.login(user, ip);

      this.logger.info(`Novo acesso de ${user.email}`);

      return req.user;
    } catch (error) {
      this.logger.error(`${error?.message}`);
      throw error;
    }
  }
}
