import { Inject, Injectable } from "@nestjs/common";
import { REPOSITORIES_TOKEN } from "../../infrastructure/database/repositories/repositories-tokens";
import type { IAuditRepository } from "../../domain/interfaces/IAuditRepository";

@Injectable()
export class AuditLogUsecase {
  constructor(
    @Inject(REPOSITORIES_TOKEN.AUDIT_REPOSITORY_TOKEN)
    private readonly auditRepository: IAuditRepository,
  ) {}

  async getLogs() {
    return await this.auditRepository.getLogs()
  }
}
