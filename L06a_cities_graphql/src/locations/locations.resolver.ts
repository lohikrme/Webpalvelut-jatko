import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LocationModel } from './models/location.model';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Resolver(() => LocationModel)
export class LocationsResolver {
    constructor (private readonly locationsService: LocationsService) {}

    @Query(() => [LocationModel])
    async getLocations(): Promise<LocationModel[]> {
        let locations = await this.locationsService.findAll();
        return locations;
    }

    @Query( () => [LocationModel])
    async getLocationsOfCity(@Args('cityName') cityName: string): Promise <LocationModel[]> {
        return await this.locationsService.findLocationsOfCity(cityName) as LocationModel[];
    }

    @Mutation ( () => LocationModel)
    async createLocation(
        @Args('cityName') cityName: string, 
        @Args('createLocationInput') createLocationDto: CreateLocationDto): Promise<LocationModel> {
            return await this.locationsService.insertLocation(cityName, createLocationDto) as unknown as LocationModel;
    }

    @Mutation(() => LocationModel)
    async updateLocation(@Args('updateLocationInput') updateLocationInput: UpdateLocationDto): Promise<LocationModel> {
        return this.locationsService.update(updateLocationInput.id, updateLocationInput);
    }

    @Mutation(() => LocationModel)
    async deleteLocation(@Args('deleteLocationId') locationId: string): Promise<LocationModel> {
        return this.locationsService.delete(locationId);
    }
    

    
}
