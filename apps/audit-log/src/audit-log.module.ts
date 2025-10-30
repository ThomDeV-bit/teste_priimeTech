import { Module } from "@nestjs/common";
import { AuditLogController } from "./controllers/audit-log.controller";
import { AuditLogService } from "./services/audit-log.service";
import { AuditRepository } from "./database/repositories/audit.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccessLogEntity } from "./database/entities/access-logs.entity";
import "dotenv/config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_LOCAL_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [AccessLogEntity],
      synchronize: true,
      migrations: [],
    }),
    TypeOrmModule.forFeature([AccessLogEntity]),
  ],
  controllers: [AuditLogController],
  providers: [AuditLogService, AuditRepository],
})
export class AuditLogModule {}
