import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateProfileDto } from "src/profiles/dto/create-profile.dto";

export class CreateUserDto {
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The email address of this user',
        example: 'joe.biden@gmail.com'
    })
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The password of this user',
        example: 'VeryH4rdPa$$word12345!'
    })
    password: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The name of this user',
        example: 'Joe Biden'
    })
    name: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'The profile of this user',
        example: '{"gender": "female", "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Rhino_in_Solio_Reserve.jpg/1280px-Rhino_in_Solio_Reserve.jpg", "owner_email": "joe.biden@gmail.com" }'
    })
    profile: CreateProfileDto;

}
    