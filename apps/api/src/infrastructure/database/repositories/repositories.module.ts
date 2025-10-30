import { audit } from "rxjs";
import { UserRepository } from "./user/user.repository";
import { AuditRepository } from "./audit/audit.repository";

export class RepositoryModule {
  static register() {
    return {
      userRepository: UserRepository,
      auditRepository: AuditRepository,
    };
  }
}
