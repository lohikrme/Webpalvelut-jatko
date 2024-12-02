import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/locations/entities/location.entity";

@Entity()
export class City {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    country_code: string;

    @OneToMany(() => Location, location => location.name, {nullable: true, cascade: true})
    locations: Location[]
}