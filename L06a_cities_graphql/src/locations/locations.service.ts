import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitiesService } from 'src/cities/cities.service';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './entities/location.entity'
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {

    constructor(@InjectRepository(Location) private locationRepository: Repository<Location>,
    private citiesService: CitiesService) {}

    async insertLocation(cityName: string, createLocationDto: CreateLocationDto): Promise<Location> {
        const city = await this.citiesService.findCityByName(cityName);
        if (!city) {
            throw new NotFoundException(`City with name ${cityName} was not found`);
        }
        // let location = this.locationRepository.create(createLocationDto);
        let location = this.locationRepository.create({
            name: createLocationDto.name,
            description: createLocationDto.description,
            streetAddress: createLocationDto.streetAddress,
            city: city
        })
        return await this.locationRepository.save(location);
    }

    async findAll(): Promise<Location[]> {
        console.log("findAll() of locations.service.ts started!")
        const locations =  await this.locationRepository.find({relations: ["city"]});
        console.log(JSON.stringify(locations));
        return locations;
    }

    async findLocationsOfCity(cityName: string): Promise<Location[]> {
        const city = await this.citiesService.findCityByName(cityName);
        if (!city) {
            throw new NotFoundException(`City with name ${cityName} was not found`);
        }
        return await this.locationRepository.find({where: {city: city}});
    }


    async update(locationId: string, updateLocationDto: UpdateLocationDto)/*: Promise<Location>*/ {
        const location = await this.locationRepository.preload({
            id: locationId,
            ...updateLocationDto,
          });
          console.log(location)
          if (!location) {
            throw new NotFoundException(`Location with ID ${locationId} not found`);
          }
          return this.locationRepository.save(location);
    }



}
