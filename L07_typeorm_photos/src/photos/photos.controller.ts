import { Body, Controller, Get, Post } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Photo } from './entities/photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Controller('photos')
export class PhotosController {
    constructor(private readonly photosService: PhotosService){}

    @Post()
    async createPhotoUsingEmail(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
        return await this.photosService.insertPhoto(createPhotoDto);
    }

    @Get()
    async getPhotos(): Promise<Photo[]> {
        return await this.photosService.getPhotos();
    }
}
