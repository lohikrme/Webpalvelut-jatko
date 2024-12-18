import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { Location } from 'src/locations/entities/location.entity';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
    constructor(@InjectRepository(City) private readonly citiesRepository: Repository<City>,
                @InjectRepository(Location) private readonly locationsRepository: Repository<Location>) {}


    async insertCity(createCityDto: CreateCityDto): Promise<City> {
        let city = this.citiesRepository.create(createCityDto);
        return await this.citiesRepository.save(city);
    }

    async findAll(): Promise<City[]> {
        console.log("findAll() of cities service started!")
        let allCities = await this.citiesRepository.find( {relations: ["locations"]});
        console.log(JSON.stringify(allCities))
        return allCities;
    }

    async findCityByName(cityName: string) : Promise<City> {
      return await this.citiesRepository.findOne({where: {name: cityName}});
    }

    async update(id: string, updateCityDto: UpdateCityDto): Promise<City> {
      const city = await this.citiesRepository.preload({
          id: id,
          ...updateCityDto,
      });
      if (!city) {
        throw new NotFoundException(`City with ID ${id} not found`);
      }
      return this.citiesRepository.save(city);
    }

    
    async delete(cityId: string): Promise<City> {
      const city = await this.citiesRepository.findOneBy({id: cityId});
      if (!city) {
        throw new NotFoundException(`City with ID ${cityId} not found`);
      }
      await this.citiesRepository.delete(city);
      return city;
    }
}

