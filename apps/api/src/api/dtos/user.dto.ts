import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, Length } from "class-validator";

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
    example: "1",
    type: Number,
  })
  @IsNumber()
  profile_id: number;
}
