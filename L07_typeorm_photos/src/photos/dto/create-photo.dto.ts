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

    // owner_email is used rather than User because
    // owner email acts a bit like a foreing key
    @IsEmail()
    @IsNotEmpty()
    owner_email: string;
}