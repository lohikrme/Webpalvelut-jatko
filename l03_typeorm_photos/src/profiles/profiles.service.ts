import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private readonly profilesRepository: Repository<Profile>);

    async insertProfile(createProfileDto: CreateProfileDto) : Promise<Profile> {
        const profile : Profile = new Profile();
        profile.gender = createProfileDto.gender;
        profile.photo = createProfileDto.photo;
        return await this.profilesRepository.save(profile);
    }

}
