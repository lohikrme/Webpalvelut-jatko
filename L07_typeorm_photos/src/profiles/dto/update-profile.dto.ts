import { PartialType } from "@nestjs/mapped-types";
import { CreateProfileDto } from "./create-profile.dto";
import { IsEmail, IsNotEmpty } from "class-validator";


export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    
}