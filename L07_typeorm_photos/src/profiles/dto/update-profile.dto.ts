import { PartialType } from "@nestjs/mapped-types";
import { CreateProfileDto } from "./create-profile.dto";
import { IsEmail, IsNotEmpty } from "class-validator";


export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    
    // owner_email is used to identify owner of profile
    // but it is not stored in the database
    @IsEmail()
    @IsNotEmpty()
    owner_email: string;
}