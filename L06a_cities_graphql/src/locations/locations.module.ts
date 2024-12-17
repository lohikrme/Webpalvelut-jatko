import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from 'src/cities/entities/city.entity';
import { Location } from './entities/location.entity';
import { CitiesModule } from 'src/cities/cities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([City, Location]),
    CitiesModule
  ],
  providers: [LocationsService, LocationsResolver]
})
export class LocationsModule {}
