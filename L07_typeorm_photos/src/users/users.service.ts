import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from 'src/profiles/dto/update-profile.dto';

@Injectable()
export class UsersService {

    private slatRounds = 10;

    constructor(@InjectRepository(User) 
        private readonly usersRepository: Repository<User>,
        private readonly profilesService: ProfilesService,
        @InjectRepository(Profile) private readonly profilesRepository: Repository<Profile>) {}
    

    async insertUser(createUserDto: CreateUserDto) : Promise<User> {
        let profile: Profile = null;
        // check if there is a profile in createUserDto data
        if (createUserDto.profile) {
            profile = await this.profilesService.insertProfile(createUserDto.profile)
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, this.slatRounds);
        const user = this.usersRepository.create({
            'email': createUserDto.email,
            'password': hashedPassword,
            'name': createUserDto.name,
            'profile': profile
        });
        // return newly created user
        try {
            return await this.usersRepository.save(user);
        }
        // handle if cant add new user
        // mysql specific error is 'ER_DUP_ENTRY'
        // postgres error code would be '23505'
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Email already exists');
            }
            else {
                throw new InternalServerErrorException('An internal server error while creating user');
            }
        }
    }


    async findUsers(): Promise<User[]> {
        const users = await this.usersRepository.find({
            relations: ['profile', 'photos', 'photos.categories'],
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                modifiedAt: true,
                profile: {
                    id: true,
                    gender: true,
                    photo: true
                },
                photos: {
                    id: true,
                    name: true,
                    url: true,
                    categories: {
                        id: true,
                        name: true
                    }
                }
            }
        });
    
        // remove password for security
        users.forEach(user => {
            user.password = "";
        });
    
        return users;
    }


    async findUserById(input_id: string): Promise<User> {
        const user = await this.usersRepository.findOne(
            {
                where: {"id": input_id}, 
                relations: ['profile', 'photos', 'photos.categories'],
                select: {
                    id: true,
                    email: true,
                    name: true,
                    createdAt: true,
                    modifiedAt: true,
                    profile: {
                        id: true,
                        gender: true,
                        photo: true
                    },
                    photos: {
                        id: true,
                        name: true,
                        url: true,
                        categories: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        );
        if(!user) throw new NotFoundException(`User not found with id ${input_id}`);
        return user;
    }


    async findUserByEmail(email: string): Promise<User> {
        console.log("findUserByEmail() from users service has started!")
        const user = await this.usersRepository.findOne(
            {
                where: {"email": email},
                relations: ['profile', 'photos', 'photos.categories'],
                select: {
                    id: true,
                    email: true,
                    name: true,
                    createdAt: true,
                    modifiedAt: true,
                    password: true,
                    profile: {
                        id: true,
                        gender: true,
                        photo: true
                    },
                    photos: {
                        id: true,
                        name: true,
                        url: true,
                        categories: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
        if(!user) throw new NotFoundException(`User not found with email ${email}`);
        return user;
    }


    async updateUserById(input_id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            console.log("updateUserById() from users service started!");
            console.log(JSON.stringify(updateUserDto));
            
            // split data so profile and other data is separate
            const { profile, ...updateData } = updateUserDto;
            
            // if contains password, hash before saving it
            if (updateData.password) {
                const hashedPassword = await bcrypt.hash(updateData.password, this.slatRounds);
                updateData.password = hashedPassword;
            }
            
            await this.usersRepository.update({ id: input_id }, updateData);
            
            // if input contains a profile, update also profile content (gender, photo url)...
            if (profile && profile.owner_email) {
                console.log(JSON.stringify(profile));
                // find the profile of the user
                const user_profile = await this.usersRepository.findOne({ 
                    where: { email: profile.owner_email },
                    relations: ['profile']
                });
                // make sure just in case that profile was found with the owner_email
                if (!user_profile) {
                    throw new NotFoundException(`User profile was not not found with email ${profile.owner_email}`);
                }
                console.log(JSON.stringify(user_profile));

                // find the updateable profile usinng profilesRepository to update
                const updateable_profile = await this.profilesRepository.findOne({
                    where: { id: user_profile.profile.id }
                });

                // update the profile
                Object.assign(updateable_profile, profile);
                await this.profilesRepository.save(updateable_profile);
            }
            // there was profile but not owner email, so info user that profile cannot be updated
            else if (profile && !profile.owner_email) {
                    throw new NotFoundException("To update profile, there must always be owner_email");
            }
            
            // find updated user and return
            const user = await this.usersRepository.findOne({
                where: { id: input_id },
                relations: ['profile', 'photos', 'photos.categories'],
                select: {
                    id: true,
                    email: true,
                    name: true,
                    createdAt: true,
                    modifiedAt: true,
                    password: true,
                    profile: {
                        id: true,
                        gender: true,
                        photo: true
                    },
                    photos: {
                        id: true,
                        name: true,
                        url: true,
                        categories: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (err) {
            // Re-throw NotFoundException to be handled by the caller
            // typical case: owner_email missing from profile
            if (err instanceof NotFoundException) {
                throw err; 
            }
            console.error("Error updating user:", err);
            throw new Error("Unable to update the user");
        }
    }



    async deleteUserById(input_id: string): Promise<User> {
        console.log("deleteUserById() from users service started!");
        const user = await this.usersRepository.findOne({
            where: {"id": input_id},
            relations: ["photos", "profile"]
        });
        // user with id was not found
        if(!user) throw new NotFoundException(`User not found with id ${input_id}`);
        // delete the user and his photos
        // because of cascade settings in entities, photos deleted automatically
        await this.usersRepository.delete(input_id);
        return user;
    }


}
