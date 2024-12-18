import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CityModel } from './models/city.model';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Resolver(() => CityModel)
export class CitiesResolver {
    constructor(private readonly citiesService: CitiesService) {}

    @Mutation( ()=> CityModel)
    async createCity(@Args('createCityInput') createCityDto: CreateCityDto):
    Promise<CityModel> {
        return await this.citiesService.insertCity(createCityDto) as CityModel;
    }

    @Query( () => [CityModel])
    async getCities(): Promise<CityModel[]> {
        return await this.citiesService.findAll();
    }

    @Mutation(() => CityModel)
    async updateCity(@Args('updateCityInput') updateCityInput: UpdateCityDto): Promise<CityModel> {
        return this.citiesService.update(updateCityInput.id, updateCityInput);
    }

    @Mutation(() => CityModel)
    async deleteCity(@Args('deleteCityId') cityId: string): Promise<CityModel> {
        return this.citiesService.delete(cityId);
    }



}
