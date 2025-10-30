import { IsNumber, IsIP, IsString } from 'class-validator';

export class CreateAccessLogDto {
  @IsNumber()
  userId: number;

  @IsString()
  userName: string;

  @IsIP()
  ip: string;
}
