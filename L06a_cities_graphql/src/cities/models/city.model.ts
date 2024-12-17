// we use this class for graphql schema
// in schema first u define schema urself
// and then write the code
// code first writes models so that 
// schemas are automatically generated during build

import { Field, ObjectType } from "@nestjs/graphql";
import { LocationModel } from "src/locations/models/location.model";


@ObjectType()
export class CityModel {

    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    country_code: string;

    @Field(() => [LocationModel], { nullable: true })
    locations: LocationModel[];

}