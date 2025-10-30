import { audit } from "rxjs";
import { UserRepository } from "./user/user.repository";
import { AuditRepository } from "./audit/audit.repository";
import { ProfileRepository } from "./profile/profile.repository";

export class RepositoryModule {
  static register() {
    return {
      userRepository: UserRepository,
      auditRepository: AuditRepository,
      profileRepository: ProfileRepository,
    };
  }
}
