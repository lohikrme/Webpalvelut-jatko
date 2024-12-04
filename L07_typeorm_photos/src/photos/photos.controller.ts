import { Body, Controller, Get, Param, Post, UseGuards, Delete, Put} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photos')
export class PhotosController {
    constructor(private readonly photosService: PhotosService){}

    @Post()
    // @UseGuards(JwtAuthGuard)
    async createPhotoUsingEmail(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
        return await this.photosService.insertPhoto(createPhotoDto);
    }

    @Get()
    // @UseGuards(JwtAuthGuard)
    async getPhotos(): Promise<Photo[]> {
        return await this.photosService.getPhotos();
    }

    @Get(':id')
    // @UseGuards(JwtAuthGuard)
    async getPhotoById(@Param('id') id: string): Promise<Photo> {
        return await this.photosService.getPhotoById(id);
    }

    @Get('name/:name')
    // @UseGuards(JwtAuthGuard)
    async getPhotoByName(@Param('name') input_name: string): Promise<Photo[]> {
        return await this.photosService.getPhotoByName(input_name);
    }

    @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    async deletePhotoById(@Param('id') id: string): Promise<Photo> {
        return await this.photosService.deletePhotoById(id);
    }

    @Put(':id')
    // @UseGuards(JwtAuthGuard)
    async updatePhotoById(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
        return await this.photosService.updatePhotoById(id, updatePhotoDto)
    }
}
