import { createPetDto } from "./create-pet.dto";
import { PartialType } from "node_modules/@nestjs/mapped-types";

export class UpdatePetDto extends PartialType(createPetDto) { }

