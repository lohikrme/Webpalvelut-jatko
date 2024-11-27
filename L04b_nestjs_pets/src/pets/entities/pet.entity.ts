// pet.entity.ts
// updated 15th october 2024

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Pet {
  @ApiProperty({ example: '3b2bd491-fc68-4655-b317-40a7e3c57440' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'Pluto' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'dog' })
  @IsString()
  species: string;

  @ApiProperty({ example: '2021-01-20' })
  @IsString()
  date_of_birth: string;

  @ApiProperty({ example: 'A loyal black-white guard dog' })
  @IsString()
  description: string;
}
