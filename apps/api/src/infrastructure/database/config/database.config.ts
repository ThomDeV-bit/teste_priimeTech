import { DataSourceOptions, DataSource } from "typeorm";
import "dotenv/config";
import { ProfileEntity } from "apps/api/src/domain/entities/profile.entity";
import { UserEntity } from "apps/api/src/domain/entities/user.entity";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_LOCAL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [UserEntity, ProfileEntity],
  synchronize: true,
  migrations: [],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
