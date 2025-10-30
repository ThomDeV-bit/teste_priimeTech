import { DataSourceOptions, DataSource } from "typeorm";
import "dotenv/config";
import { ProfileEntity } from "apps/api/src/domain/entities/profile.entity";
import { UserEntity } from "apps/api/src/domain/entities/user.entity";
import { AccessLogEntity } from "apps/audit-log/src/database/entities/access-logs.entity";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.PG_HOST,
  port: Number(process.env.PG_LOCAL_PORT),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: [UserEntity, ProfileEntity, AccessLogEntity],
  synchronize: true,
  migrations: [],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
