
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    name: string;

    @Column()
    location: string;

    @Column()
    description: string;

    @Column()
    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;

    // notice that this field does not have column annotation, so it is not saved in db
    category_names?: string[]

    // because one user can have many photos
    // here we mirror and define, that many photos can have one user
    @ManyToOne(() => User, (user) => user.photos)
    owner: User;

    @ManyToMany( () => Category, (category) => category.photos)
    @JoinTable()
    categories: Category[]
}

