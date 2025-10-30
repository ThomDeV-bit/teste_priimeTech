import { Injectable } from '@nestjs/common';
import { AuditRepository } from '../database/repositories/audit.repository';
import { CreateAccessLogDto } from '../dtos/access-log.dto';

@Injectable()
export class AuditLogService {
    constructor(
        private readonly auditLogRepository : AuditRepository
    )
    {}
  async register(data : CreateAccessLogDto) {
    return await this.auditLogRepository.create(data)
  }
}
