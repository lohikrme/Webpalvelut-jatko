import { Query, Resolver } from '@nestjs/graphql';
import { LocationModel } from './models/location.model';
import { LocationsService } from './locations.service';
import { CityModel } from 'src/cities/models/city.model';

@Resolver((of) => LocationModel)
export class LocationsResolver {
    constructor (private readonly locationsService: LocationsService) {}

    
}
