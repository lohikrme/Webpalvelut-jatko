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

    @OneToOne(() => Profile, (profile) => {
        profile.user, {cascade: true}
    })
    @JoinColumn()
    profile: Profile;

    // one user can have many photos
    @OneToMany( ()=> Photo, (photo) => photo.owner)
    photos: Photo[]
}

