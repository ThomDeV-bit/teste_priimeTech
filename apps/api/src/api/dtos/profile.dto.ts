import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class ProfileDTO {
  @ApiProperty({
    description: "Tipo do Perfil do usuário",
    example: "admin",
    type: String,
  })
  @IsString()
  role: string;
}
