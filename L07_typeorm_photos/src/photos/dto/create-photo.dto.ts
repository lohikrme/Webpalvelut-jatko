import { IsEmail, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreatePhotoDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    // photo files are stored inside url address
    @IsUrl()
    @IsNotEmpty()
    url: string;

    // owner_email is used to identify owner of photo
    // but it is not stored in the database
    @IsEmail()
    @IsNotEmpty()
    owner_email: string;
}