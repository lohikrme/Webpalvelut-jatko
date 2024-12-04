
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
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

    // many photos can have one owner
    // when user (owner) is deleted, photos are deleted
    // in sql lang this is done like next: 
    // FOREIGN KEY (ownerId) REFERENCES User(id) ON UPDATE CASCADE
    // here same is achieved with onDelete: 'CASCADE' parameter
    @ManyToOne(() => User, (user) => user.photos, {onDelete: 'CASCADE'})
    owner: User;

    // many photos can have many categories
    @ManyToMany( () => Category, (category) => category.photos)
    @JoinTable()
    categories: Category[]
}

