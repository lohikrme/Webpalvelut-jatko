import { Injectable, NotFoundException } from '@nestjs/common';
import { Pet } from './entities/pet.entity';
import { createPetDto } from './dto/create-pet.dto';
// uuid is used to make unique string keys for primary key id
import { v4 as uuidv4 } from 'uuid';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
    // fake DB for pets
    private pets: Pet[] = [];

    insertPet(petData: createPetDto): Pet {
        const pet = new Pet();
        pet.id = uuidv4();
        pet.name = petData.name;
        pet.species = petData.species;
        pet.date_of_birth = petData.date_of_birth;
        pet.description = petData.description;
        this.pets.push(pet);
        return pet;
    }

    getPets(): Pet[] {
        // return a copy of private pets data, not straight access
        return [...this.pets];
    }

    getSinglePet(id: string): Pet {
        const idx = this.pets.findIndex((pet) => pet.id === id);
        if (idx === -1) {
            throw new NotFoundException('Could not find a matching pet id');
        }
        return { ...this.pets[idx] };
    }

    updatePet(id: string, petData: UpdatePetDto): Pet {
        const idx = this.pets.findIndex((pet) => pet.id === id);
        if (idx === -1) {
            throw new NotFoundException('Could not find a matching pet id');
        }
        // first make copy of the original pet and modify it

        /* In java spring it would be:
        if (petData.getName() != null) {
            pet.setName(petData.getName());
        }
        if (petData.getSpecies() != null) {
            pet.setSpecies(petData.getSpecies());
        }
        if (petData.getDateOfBirth() != null) {
            pet.setDateOfBirth(petData.getDateOfBirth());
        }
        if (petData.getDescription() != null) {
            pet.setDescription(petData.getDescription());
        }
        */

        // in typescript, ... structure does the same:
        const modifiedPet = { ...this.pets[idx], ...petData };

        // next save the modified animal back to DB (this case fake DB)
        this.pets[idx] = modifiedPet;

        return modifiedPet;
    }
}
