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

    // profile row of users datatable
    // first param returns entity that relation refers to aka Profile
    // second param defines how profiles table is linked to users with profile.user
        // basically, orm automatically creates a foreign key
    // third parameter, the js object cascade true means that
        // all changes to user automatically apply also to a connected profile
    @OneToOne( () => Profile, (profile) => profile.user, {cascade: true})
    @JoinColumn()
    profile: Profile;

    // one user can have many photos
    // first param returns entity that relation refers to aka Photo
    // second param defines how photos table is linked to users with photo.owner
        // basically, orm automatically creates a foreign key
    @OneToMany( ()=> Photo, (photo) => photo.owner)
    photos: Photo[]
}

