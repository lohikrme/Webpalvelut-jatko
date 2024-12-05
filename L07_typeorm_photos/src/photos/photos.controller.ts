import { Body, Controller, Get, Param, Post, UseGuards, Delete, Put} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('photos')
export class PhotosController {
    constructor(private readonly photosService: PhotosService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Create a new photo. Can same time attach the new photo to different pre-existing categories."})
    @ApiCreatedResponse({description: 'The photo has been successfully created'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async createPhotoUsingEmail(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
        return await this.photosService.insertPhoto(createPhotoDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Find all photos. Shows also limited info of their owners and categories."})
    @ApiOkResponse({description: 'All photos were found successfully'})
    @ApiNotFoundResponse({description: 'No photos were found'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async getPhotos(): Promise<Photo[]> {
        return await this.photosService.getPhotos();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Find a photo by id. Shows also limited info of its owner and categories."})
    @ApiOkResponse({description: 'The photo was found successfully by id'})
    @ApiNotFoundResponse({description: 'There was no photo with id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async getPhotoById(@Param('id') id: string): Promise<Photo> {
        return await this.photosService.getPhotoById(id);
    }

    @Get('name/:name')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Find a photo by name. Shows also limited info of its owner and categories."})
    @ApiOkResponse({description: 'The photo was found successfully by name'})
    @ApiNotFoundResponse({description: 'There was no photo with name'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async getPhotoByName(@Param('name') input_name: string): Promise<Photo[]> {
        return await this.photosService.getPhotoByName(input_name);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Update a photo. This endpoint can also update, which categories a photo belongs to."})
    @ApiOkResponse({description: 'The photo was updated successfully'})
    @ApiNotFoundResponse({description: 'There was no photo with id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async updatePhotoById(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
        return await this.photosService.updatePhotoById(id, updatePhotoDto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Delete a photo."})
    @ApiOkResponse({description: 'The photo was deleted successfully'})
    @ApiNotFoundResponse({description: 'There was no photo with id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async deletePhotoById(@Param('id') id: string): Promise<Photo> {
        return await this.photosService.deletePhotoById(id);
    }
}
