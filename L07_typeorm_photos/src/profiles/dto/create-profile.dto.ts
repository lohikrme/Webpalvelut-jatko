import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfileDto {
    
    // male or female or undefinied?
    @IsString()
    @IsNotEmpty()
    gender: string;

    // is the url address to photo
    @IsString()
    @IsNotEmpty()
    photo: string;
}