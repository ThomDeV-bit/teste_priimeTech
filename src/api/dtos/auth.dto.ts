import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class AuthDto {
  @ApiProperty({
    description: "E-mail do usuário",
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Senha do usuário",
    type: String,
  })
  @Length(5, 50)
  password: string;
}
