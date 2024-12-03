import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';

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
        // handle if cant add new user
        try {
            return await this.usersRepository.save(user);
        }
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
        // return await this.usersRepository.find();
        return await this.usersRepository.find({relations: ['profile', 'photos', 'photos.categories']});
    }

    async findUserById(id: string): Promise<User> {
        const user = await this.usersRepository.findOne(
            {
                where: {"id": id}, 
                "relations": ['profile', 'photos', 'photos.categories']
            });
        if(!user) throw new NotFoundException('id not found');
        // make a deep copy with {...<name>} so not access to code
        return {...user};
    }

    async findUserByEmail(email: string): Promise<User> {
        console.log("UserService's findUserByEmail() has started!")
        const user = await this.usersRepository.findOne(
            {
                where: {"email": email}
            });
        if(!user) throw new NotFoundException('Email not found');
        // make a deep copy with {...<name>} so not access to code
        return {...user};
    }
}
