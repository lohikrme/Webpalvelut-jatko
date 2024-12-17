import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateCityDto {
    @Field()
    name: string;

    @Field()
    country_code: string;

}