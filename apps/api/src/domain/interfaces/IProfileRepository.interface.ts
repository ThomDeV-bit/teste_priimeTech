import { AccessLogEntity } from "apps/audit-log/src/database/entities/access-logs.entity";
import { ProfileDTO } from "../../api/dtos/profile.dto";
import { ProfileEntity } from "../entities/profile.entity";

export interface IProfileRepository {
    create(profile: ProfileDTO): Promise<boolean>
    getProfile(): Promise<ProfileEntity[]>
}
