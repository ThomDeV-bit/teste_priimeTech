import { Module, DynamicModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "../config/database.config";
import { OPTIONS_TYPE } from "./typeorm-module-definition";
import { REPOSITORIES_TOKEN } from "./repositories-tokens";
import { ProfileEntity } from "apps/api/src/domain/entities/profile.entity";
import { UserEntity } from "apps/api/src/domain/entities/user.entity";
import { AccessLogEntity } from "apps/audit-log/src/database/entities/access-logs.entity";

@Module({})
export class TypeormModule {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const entitiesSchema = [UserEntity, ProfileEntity, AccessLogEntity];
    const config = dataSourceOptions;
    return {
      module: TypeormModule,
      global: true,
      imports: [
        TypeOrmModule.forFeature(entitiesSchema),
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return {
              autoLoadEntities: true,
              ...config,
            };
          },
        }),
      ],
      exports: [
        REPOSITORIES_TOKEN.USER_REPOSITORY_TOKEN,
        REPOSITORIES_TOKEN.AUDIT_REPOSITORY_TOKEN,
      ],
      providers: [
        {
          provide: REPOSITORIES_TOKEN.USER_REPOSITORY_TOKEN,
          useClass: options.userRepository,
        },
        {
          provide: REPOSITORIES_TOKEN.AUDIT_REPOSITORY_TOKEN,
          useClass: options.auditRepository,
        },
      ],
    };
  }
}
