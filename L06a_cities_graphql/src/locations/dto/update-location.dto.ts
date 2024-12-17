import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateLocationDto } from "./create-location.dto";


@InputType()
export class UpdateLocationDto extends PartialType(CreateLocationDto){
    @Field()
    id: string;
}