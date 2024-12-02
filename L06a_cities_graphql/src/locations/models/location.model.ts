// we use this class for graphql schema
// in schema first u define schema urself
// and then write the code
// code first writes models so that 
// schemas are automatically generated during build

import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LocationModel {
    
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    streetAddress: string;

}