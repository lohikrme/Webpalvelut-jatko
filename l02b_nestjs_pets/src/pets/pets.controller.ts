import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { createPetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) { }

    @Post()
    createPet(
        // @Body('name') name: string,
        // @Body('species') species: string,
        // @Body('date_of_birth') date_of_birth: string,
        // @Body('description') description: string
        @Body() petData: createPetDto
    ): Pet {
        return this.petsService.insertPet(petData);
    }

    @Get()
    getPets(): Pet[] {
        return this.petsService.getPets();
    }


    @Get(':id')
    getPet(@Param('id') id: string): Pet {
        return this.petsService.getSinglePet(id);
    }

    @Patch(':id')
    updatePet(
        @Param('id') id: string,
        @Body() petData: UpdatePetDto
    ): Pet {
        return this.petsService.updatePet(id, petData);
    }
}