import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) 
    private readonly profilesRepository: Repository<Profile>){}

    async checkConnection(): Promise<boolean> {
        try {
            await this.profilesRepository.query('SELECT 1');
            return true;
        } catch (error) {
            console.error('Database connection error:', error);
            return false;
        }
    }

    async insertProfile(createProfileDto: CreateProfileDto) : Promise<Profile> {
        try {
        console.log("insertProfile() from profiles service starts!")
        const profile : Profile = new Profile();
        if (!createProfileDto.gender) {
            createProfileDto.gender = 'unknown';
        }
        if (!createProfileDto.photo) {
            createProfileDto.photo = 'empty-user-photo';
        }
        profile.gender = createProfileDto.gender;
        profile.photo = createProfileDto.photo;
        return await this.profilesRepository.save(profile);
        }
        catch (err) {
            console.error("Error inserting profile:", err);
            throw new Error("Failed to insert profile");
        }

    }


}

