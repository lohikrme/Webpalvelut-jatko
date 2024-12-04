import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    private slatRounds = 10;

    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly profilesService: ProfilesService) {}
    

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
                "relations": ['profile', 'photos', 'photos.categories']
            }
        );
        if(!user) throw new NotFoundException(`User not found with id ${input_id}`);
        // make a deep copy with {...<name>} so not access to code
        return user;
    }


    async findUserByEmail(email: string): Promise<User> {
        console.log("findUserByEmail() from users service has started!")
        const user = await this.usersRepository.findOne(
            {
                where: {"email": email}
            });
        if(!user) throw new NotFoundException(`User not found with email ${email}`);
        // make a deep copy with {...<name>} so not access to code
        return user;
    }


    async updateUserById(input_id: string, updateUserDto: UpdateUserDto): Promise<User> {
        console.log("updateUserById() from users service started!");
        console.log(JSON.stringify(updateUserDto));
        if (updateUserDto.password) {
            const hashedPassword = await bcrypt.hash(updateUserDto.password, this.slatRounds);
            updateUserDto.password = hashedPassword;
        }
        await this.usersRepository.update({id: input_id}, updateUserDto);
        const user = await this.usersRepository.findOne(
            {
                where: {"id": input_id}, 
                "relations": ['profile', 'photos', 'photos.categories']
            }
        );
        if(!user) throw new NotFoundException(`User not found with id ${input_id}`);
        return user;
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
