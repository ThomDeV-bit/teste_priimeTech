import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { ROLES_KEY } from "./roles/roles.decorator";
import { Role } from "./roles/roles.enum";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtToken: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new ForbiddenException("TOKEN de requisição ausente.");
    try {
      const payload = await this.jwtToken.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      throw new ForbiddenException("TOKEN de requisição inválido.");
    }

    const validate = requiredRoles.some(
      (roles) => request.user?.profile.role === roles
    );

    if (!validate)
      throw new UnauthorizedException(
        "Usuário não permissão para acessar essa rota"
      );

    return validate;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
