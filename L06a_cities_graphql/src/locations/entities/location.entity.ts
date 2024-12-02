import { City } from "src/cities/entities/city.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    streetAddress: string;

    @ManyToOne(() => City, city => city.locations, {nullable: true, onDelete: 'SET NULL'})
    city: City
}