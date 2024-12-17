import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateCityDto } from "./create-city.dto";

@InputType()
export class UpdateCityDto extends PartialType(CreateCityDto){
    @Field()
    id: string;
}