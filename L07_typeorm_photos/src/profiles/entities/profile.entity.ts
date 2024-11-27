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

    @OneToOne(() => User, (user) => user.profile)
    user: User;
}