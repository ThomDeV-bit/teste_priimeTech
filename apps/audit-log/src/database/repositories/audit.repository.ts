import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ReturnDocument } from "typeorm";
import { AccessLogEntity } from "../entities/access-logs.entity";
import { CreateAccessLogDto } from "../../dtos/access-log.dto";

@Injectable()
export class AuditRepository {
  constructor(
    @InjectRepository(AccessLogEntity)
    private readonly accessLogEntity: Repository<AccessLogEntity>
  ) {}


  async create(data : CreateAccessLogDto){
    try {
        const log =  this.accessLogEntity.create(data)

        const create = await this.accessLogEntity.save(log)


        console.log("passou create",log)

        return create

    } catch (error) {
        console.log(error)
        throw new HttpException('DATA_BASE ERRO', 400)
    }
  }
}
