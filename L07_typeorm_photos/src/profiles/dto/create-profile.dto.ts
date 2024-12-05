import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateProfileDto {
    
    // male or female or undefinied?
    @IsString()
    @IsOptional()
    gender: string = "unknown";

    // is the url address to photo
    @IsString()
    @IsOptional()
    @IsUrl()
    photo: string = "empty-user-photo";

    // owner_email is used to identify owner of profile
    // but it is not stored in the database
    @IsEmail()
    owner_email: string;

}