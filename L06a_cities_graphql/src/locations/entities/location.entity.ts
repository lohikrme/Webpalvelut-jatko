import { Field, ID, ObjectType } from "@nestjs/graphql";
import { City } from "src/cities/entities/city.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Location {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    streetAddress: string;

    // explanation of parameters
    // @Field means city is part of Locations in the graphql schema
    // () => City, { nullable: true } inside Field means city of location is part of graphql schema and can be null
    // @ManyToOne means many locations all have just one city (or null)
    // () => City inside manytoone means many to one is from location to city
    // city => city.locations means that cities table will use locations as foreign key
    // {nullable: false} means location must have a city
    // {onDelete: 'CASCADE'} means if city is deleted, also locations reference is deleted
    @Field(() => City, { nullable: true })
    @ManyToOne(() => City, city => city.locations, {nullable: false, onDelete: 'CASCADE'})
    city: City
}