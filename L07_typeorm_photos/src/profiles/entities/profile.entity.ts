import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { IsUrl } from "class-validator";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    gender: string

    // the photo is a url that ref to the photo
    @Column()
    @IsUrl()
    photo: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    modifiedAt: Date;

    // one profile can have one user
    // '() => User' means that the OneToOne relation refers to User
    // '(user) => user.profile' defines how orm creates a foreign key
    // idea is that foreign key is mirrored in both entity files
    // '{onDelete: 'CASCADE'}' means that also profile is deleted when user is deleted
    @OneToOne(() => User, (user) => user.profile, {onDelete: 'CASCADE'})
    user: User;
}