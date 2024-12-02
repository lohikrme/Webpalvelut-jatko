import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CitiesService {
    constructor(@InjectRepository(City) private readonly citiesRepository: Repository<City>) {}

    async findAll(): Promise<City[]> {
        // return await this.citiesRepository.find();
        // for testing
        const city: City = {
            id: uuidv4(),
            name: "Lahti",
            country_code: "FI",
            locations: null
        }
        return [city];
    }
}

