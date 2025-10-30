import { DynamicModule, Module } from "@nestjs/common";
import { UserUsecase } from "./user/user.use-case";
import { AuthUsecase } from "./auth/auth.use-case";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuditLogUsecase } from "./audit/audit-log.use-case";
import { ProfileUsecase } from "./profile/profile.use-case";

@Module({})
export class UseCaseModule {
  static register(): DynamicModule {
    return {
      module: UseCaseModule,
      imports: [
        ClientsModule.register([
          {
            name: "AUDIT_SERVICE",
            transport: Transport.RMQ,
            options: {
              urls: ["amqp://guest:guest@rabbitmq:5672"],
              queue: "audit_log",
              queueOptions: {
                durable: false,
              },
            },
          },
        ]),
      ],
      global: true,
      providers: [UserUsecase, AuthUsecase, AuditLogUsecase, ProfileUsecase],
      exports: [UserUsecase, AuthUsecase, AuditLogUsecase, ProfileUsecase],
    };
  }
}
