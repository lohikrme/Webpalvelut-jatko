import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/locations/entities/location.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class City {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;
    
    @Field()
    @Column()
    country_code: string;

    // explanation of parameters:
    // () => Location means one to many is from city to location
    // location => location.city means locations table has a city column as foreign key
    // {nullable: true} means city does not need locations
    // {cascade: true} means when city is deleted, also locations are deleted 
    @Field(() => [Location])
    @OneToMany(() => Location, location => location.city, {nullable: true, cascade: true})
    locations: Location[]
}