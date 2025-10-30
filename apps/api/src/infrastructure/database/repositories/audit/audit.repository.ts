import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccessLogEntity } from "apps/audit-log/src/database/entities/access-logs.entity";

import { Repository } from "typeorm";

@Injectable()
export class AuditRepository {
  constructor(
    @InjectRepository(AccessLogEntity)
    private readonly accessLogEntity: Repository<AccessLogEntity>
  ) {}

  async getLogs(): Promise<AccessLogEntity[]> {
    try {
      return await this.accessLogEntity.find();
    } catch (error) {
      throw new Error(error);
    }
  }
}
