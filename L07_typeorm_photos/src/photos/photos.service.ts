import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Injectable()
export class PhotosService {
    constructor(@InjectRepository(Photo) private readonly photosRepository: Repository<Photo>,
                private readonly usersService: UsersService) {}

    async insertPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
        const photo_owner = await this.usersService.findUserByEmail(createPhotoDto.owner_email);
        if (!photo_owner) throw new NotFoundException('Owner of photo not found!');
        const photo = new Photo();
        photo.name = createPhotoDto.name;
        photo.location = createPhotoDto.location;
        photo.description = createPhotoDto.description;
        photo.url = createPhotoDto.url;
        photo.owner = photo_owner;

        return await this.photosRepository.save(photo);
        
    }

    async getPhotos() : Promise<Photo[]> {
        console.log("getPhotos() from photos service started!");
        const photos =  await this.photosRepository.find({relations:['owner']});
        // remove passwords to not leak
        photos.forEach( (photo) => {
            photo.owner.password = ""
        } );
        return photos;
    }
}
