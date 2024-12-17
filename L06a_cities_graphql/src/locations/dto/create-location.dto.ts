import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateLocationDto {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    streetAddress: string;
}