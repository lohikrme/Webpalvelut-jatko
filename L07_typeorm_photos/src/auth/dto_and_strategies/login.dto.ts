import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class LoginDto {

    @ApiProperty({
        description: "The email address used to log in",
        example: "test.user@gmail.com"
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: "The password used to log in",
        example: "testpassword"
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}