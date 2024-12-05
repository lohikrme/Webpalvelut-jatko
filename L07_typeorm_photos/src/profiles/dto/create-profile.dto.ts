import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateProfileDto {
    
    // male or female or undefinied?
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The gender of the user who owns this profile',
        example: 'female'
    })
    gender: string = "unknown";

    // is the url address to photo
    @IsString()
    @IsOptional()
    @IsUrl()
    @ApiProperty({
        description: 'The url address to the profile picture',
        example: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Rhino_in_Solio_Reserve.jpg/1280px-Rhino_in_Solio_Reserve.jpg'
    })
    photo: string = "empty-user-photo";

    // owner_email is used to identify owner of profile
    // but it is not stored in the database
    @IsEmail()
    @ApiProperty({
        description: 'The email address of the user who owns this profile',
        example: 'Joe.Biden@gmail.com'
    })
    owner_email: string;

}