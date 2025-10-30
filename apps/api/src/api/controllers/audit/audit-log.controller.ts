import { Body, Controller, Get, Post, Request } from "@nestjs/common";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { AuthUsecase } from "../../../use-cases/auth/auth.use-case";
import { PinoLogger } from "nestjs-pino";
import { AuthDto } from "../../dtos/auth.dto";
import { AuditLogUsecase } from "apps/api/src/use-cases/audit/audit-log.use-case";

@Controller("audit")
@ApiTags("audit")
export class AuditController {
  constructor(
    private readonly auditUsecase: AuditLogUsecase,
    private readonly logger: PinoLogger
  ) {}

  @Get("Logs")
  @ApiProperty()
  async getLogs() {
    try {
      return this.auditUsecase.getLogs()
    } catch (error) {
      this.logger.error(`${error?.message}`);
      throw error;
    }
  }
}
