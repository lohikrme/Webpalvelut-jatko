// pets.controller.ts
// updated 15th october 2024

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { createPetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  // CREATE A NEW PET
  @Post()
  @ApiOperation({ summary: 'Create a new pet' })
  @ApiCreatedResponse({
    description: 'The Pet has been created successfully',
    type: Pet,
  })
  createPet(@Body() petData: createPetDto): Pet {
    return this.petsService.insertPet(petData);
  }

  // READ ALL PETS
  @Get()
  @ApiOperation({ summary: 'Get all pets' })
  @ApiCreatedResponse({
    description: 'ok',
    type: Pet,
  })
  getPets(): Pet[] {
    return this.petsService.getPets();
  }

  // READ A SPECIFIC PET
  @Get(':id')
  @ApiOperation({ summary: 'Get a single pet' })
  @ApiParam({ name: 'id', example: '3b2bd491-fc68-4655-b317-40a7e3c57440' })
  @ApiResponse({ status: 200, description: 'ok' })
  @ApiResponse({ status: 404, description: 'Could not find a matching pet ID' })
  getPet(@Param('id') id: string): Pet {
    return this.petsService.getSinglePet(id);
  }

  // UPDATE A SPECIFIC PET
  @Patch(':id')
  @ApiOperation({ summary: 'Update a single pet' })
  @ApiParam({ name: 'id', example: '3b2bd491-fc68-4655-b317-40a7e3c57440' })
  @ApiResponse({
    status: 200,
    description: 'The Pet has been updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Could not find a matching pet ID' })
  updatePet(@Param('id') id: string, @Body() petData: UpdatePetDto): Pet {
    return this.petsService.updatePet(id, petData);
  }

  // DELETE A SPECIFIC PET
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a single pet' })
  @ApiParam({ name: 'id', example: '3b2bd491-fc68-4655-b317-40a7e3c57440' })
  @ApiResponse({
    status: 204,
    description: 'The Pet has been deleted successfully',
  })
  deletePet(@Param('id') id: string): Pet {
    return this.petsService.deletePet(id);
  }
}
