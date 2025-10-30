import { Controller, Get } from '@nestjs/common';
import { AuditLogService } from '../services/audit-log.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateAccessLogDto } from '../dtos/access-log.dto';

@Controller()
export class AuditLogController {
  constructor(
    private readonly auditLogService: AuditLogService
) {}

  @EventPattern('audit_log')
  async handleAccessLog(@Payload() data: CreateAccessLogDto) {
    console.log("passou aqui", data)
    await this.auditLogService.register(data);
  }
}
