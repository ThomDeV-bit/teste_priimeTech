import { DynamicModule, Module } from "@nestjs/common";
import { OPTIONS_TYPE } from "./api-module-definition";
import { UserController } from "./controllers/user/user.controller";
import { AuthController } from "./controllers/auth/auth.controller";
import { AuditController } from "./controllers/audit/audit-log.controller";
import { ProfileController } from "./controllers/profile/profile.controller";

@Module({})
export class ApiModule {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      module: ApiModule,
      global: true,
      controllers: [
        UserController,
        AuthController,
        AuditController,
        ProfileController,
      ],
      imports: [options.useCaseModule],
    };
  }
}
