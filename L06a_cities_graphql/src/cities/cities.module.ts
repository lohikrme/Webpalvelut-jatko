import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesResolver } from './cities.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Location } from 'src/locations/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([City]),
    TypeOrmModule.forFeature([Location])
  ],
  providers: [CitiesService, CitiesResolver],
  exports: [CitiesService]
})
export class CitiesModule {}
