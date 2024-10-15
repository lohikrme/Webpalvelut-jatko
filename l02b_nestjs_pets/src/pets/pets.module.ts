// pets.module.ts
// updated 15th october 2024

import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

@Module({
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
