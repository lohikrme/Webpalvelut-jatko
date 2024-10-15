// app.module.ts
// updated 15th october 2024

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [PetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
