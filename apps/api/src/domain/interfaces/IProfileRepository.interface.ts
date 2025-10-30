import { AccessLogEntity } from "apps/audit-log/src/database/entities/access-logs.entity";
import { ProfileDTO } from "../../api/dtos/profile.dto";

export interface IProfileRepository {
    create(profile: ProfileDTO): Promise<boolean>
}
