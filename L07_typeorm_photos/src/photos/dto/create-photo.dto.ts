import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreatePhotoDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The name of a photo',
        example: 'Attacking Rhino 2 at Safari 2011'
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The location where photo has been taken',
        example: 'Tsavo East National Park, Kenya, Africa'
    })
    location: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The description of the photo',
        example: 'The photo of this attacking rhino shows well how rhino horn counters the mouth of a hippo...'
    })
    description: string;

    // photo files are stored inside url address
    @IsUrl()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The url of the photo',
        example: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Rhino_in_Solio_Reserve.jpg/1280px-Rhino_in_Solio_Reserve.jpg'
    })
    url: string;

    // owner_email is used to identify owner of photo
    // but it is not stored in the database
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The email address of the user who owns the photo',
        example:'Joe.Biden@gmail.com'
    })
    owner_email: string;


    // every photo has an array of category names it belongs to
    @IsArray()
    @ApiProperty({
        description: 'The names of all categories, the photo belongs to. Helpful for finding photos based on themes.',
        example: '["Animals", "Africa", "Travel", "Safari"]'
    })
    category_names: string[];
}