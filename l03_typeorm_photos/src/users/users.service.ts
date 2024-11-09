import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    private slatRounds = 10;

    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly profilesService: ProfilesService) {}
    
    async findUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async insertUser(createUserDto: CreateUserDto) : Promise<User> {
        let profile: Profile = null;

        // check if there is a profile in createUserDto data
        if (createUserDto.profile) {
            profile = await this.profilesService.insertProfile(createUserDto.profile)
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, this.slatRounds);

        const user = this.usersRepository.create({
            'username': createUserDto.username,
            'password': hashedPassword,
            'name': createUserDto.name,
            'profile': profile
        });
        // TODO: unique handler is missing
        return await this.usersRepository.save(user);
    }
}
