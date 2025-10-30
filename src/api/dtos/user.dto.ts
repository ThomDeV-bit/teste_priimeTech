import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class UserDto {
  @ApiProperty({
    description: "Nome do usuário",
    type: String,
  })
  @Length(3, 30)
  name: string;

  @ApiProperty({
    description: "E-mail do usuário",
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "E-mail do usuário",
    type: String,
  })
  @Length(5, 50)
  password: string;

  @ApiProperty({
    description: "Perfil do usuário",
    example: "Admin = 1, User = 2",
    type: Number,
  })
  perfil: number;
}
