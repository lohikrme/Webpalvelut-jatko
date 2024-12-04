import { Photo } from "src/photos/entities/photo.entity";
import { Profile } from "src/profiles/entities/profile.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // email is somewhat used to identify and communicate with user
    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;

    // one user can have one profile
    // '() => Profile' means that the OneToOne relation refers to Profile
    // '(profile) => profile.user' defines how orm creates a foreign key
    // idea is that foreign key is mirrored in both entity files
    // '{cascade: true}' means that also profile is deleted when user is deleted
    @OneToOne( () => Profile, (profile) => profile.user, {cascade: true})
    @JoinColumn()
    profile: Profile;

    // one user can have many photos
    @OneToMany( ()=> Photo, (photo) => photo.owner, {cascade: true})
    photos: Photo[]
}

