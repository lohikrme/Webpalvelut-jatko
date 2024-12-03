import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { In, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class PhotosService {
    constructor(@InjectRepository(Photo) private readonly photosRepository: Repository<Photo>,
                @InjectRepository(Category) private readonly categoriesRepo: Repository<Category>,
                private readonly usersService: UsersService) {}

    async insertPhoto(createPhotoDto: CreatePhotoDto): Promise<Photo> {
        const photo_owner = await this.usersService.findUserByEmail(createPhotoDto.owner_email);
        if (!photo_owner) throw new NotFoundException('Owner of photo not found!');

        const photo = this.photosRepository.create({
            name: createPhotoDto.name,
            location: createPhotoDto.location,
            description: createPhotoDto.description,
            url: createPhotoDto.url,
            owner: photo_owner,
        });
        

        // check if there are categories to add
        if (createPhotoDto.category_names || createPhotoDto.category_names.length > 0) {
            const categories = await this.categoriesRepo.findBy({
                name: In(createPhotoDto.category_names)
            });
            // categories is array of Category objects, as seen in photo.entity.ts
            photo.categories = categories;
        }
        return await this.photosRepository.save(photo);
        
    }

    async getPhotos() : Promise<Photo[]> {
        console.log("getPhotos() from photos service started!");
        const photos =  await this.photosRepository.find({relations:['owner', 'categories']});

        // remove passwords to not leak
        // also delete unnecessary information of owners
        photos.forEach( (photo) => {
            delete photo.owner.password;
            delete photo.owner.createdAt;
            delete photo.owner.modifiedAt;
        } );

        // dont print other info of categories than the names
        photos.forEach(photo => {
            photo.category_names = photo.categories.map(category => category.name);
        });
        photos.forEach(photo => {
            delete photo.categories;
        });

        return photos;
    }
}
