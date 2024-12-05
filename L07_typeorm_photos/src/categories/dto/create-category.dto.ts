import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateCategoryDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The name of a category',
        example: 'Animals'
    })
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The description of a category',
        example: 'Animals category contains photos of different kind of birds, mammals, fish...'
    })
    readonly description: string;

}