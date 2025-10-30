import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('access_logs')
export class AccessLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  userName: string;

  @Column()
  ip: string;

  @CreateDateColumn()
  timestamp: Date;
}
