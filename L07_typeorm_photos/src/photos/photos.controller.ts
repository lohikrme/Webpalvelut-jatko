import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
}
