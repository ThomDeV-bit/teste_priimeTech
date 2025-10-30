import { AccessLogEntity } from "apps/audit-log/src/database/entities/access-logs.entity";

export interface IAuditRepository {
    getLogs(): Promise<AccessLogEntity[]>
}
