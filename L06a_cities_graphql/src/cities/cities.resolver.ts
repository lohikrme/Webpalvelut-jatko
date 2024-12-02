import { Query, Resolver } from '@nestjs/graphql';
import { CityModel } from './models/city.model';
import { CitiesService } from './cities.service';

@Resolver((of) => CityModel)
export class CitiesResolver {
    constructor(private readonly citiesService: CitiesService) {}

    @Query( () => [CityModel])
    async getCities(): Promise<CityModel[]> {
        let cities = await this.citiesService.findAll();
        return cities as CityModel[];

    }
}
