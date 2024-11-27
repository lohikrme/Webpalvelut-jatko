// update-pet.dto.ts
// updated 15th october 2024

import { ApiProperty } from '@nestjs/swagger';
import { createPetDto } from './create-pet.dto';
import { PartialType } from 'node_modules/@nestjs/mapped-types';
import { IsDateString, IsString, Length } from 'class-validator';

export class UpdatePetDto extends PartialType(createPetDto) {
  @ApiProperty({ example: 'Pluto' })
  @IsString()
  name?: string;

  @ApiProperty({ example: 'dog' })
  @IsString()
  species?: string;

  @ApiProperty({ example: '2017-03-20' })
  @IsDateString()
  date_of_birth?: string;

  @ApiProperty({ example: 'A loyal black-white guard dog' })
  @IsString()
  @Length(10, 200)
  description?: string;
}
