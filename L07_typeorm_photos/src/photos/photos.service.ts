import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { In, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Category } from 'src/categories/entities/category.entity';
import { UpdatePhotoDto } from './dto/update-photo.dto';

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
        const photos =  await this.photosRepository.find({
            relations:['owner', 'categories'],
            select: {
                id: true,
                name: true,
                location: true,
                description: true,
                url: true,
                createdAt: true,
                modifiedAt: true,
                owner: {
                    id: true,
                    email: true,
                    name: true
                },
                categories: {
                    name: true
                }
            }
        });
        // dont print other info of categories than the names
        photos.forEach(photo => {
            photo.category_names = photo.categories.map(category => category.name);
        });
        photos.forEach(photo => {
            delete photo.categories;
        });
        return photos;
    }


    async getPhotoById(input_id: string) : Promise<Photo> {
        console.log("getPhotoById() from photos service started!");
        const photo =  await this.photosRepository.findOne({
            where: {id: input_id},
            relations:['owner', 'categories'],
            select: {
                id: true,
                name: true,
                location: true,
                description: true,
                url: true,
                createdAt: true,
                modifiedAt: true,
                owner: {
                    id: true,
                    email: true,
                    name: true
                },
                categories: {
                    name: true
                }
            }
        });
        // if photo with id does not exist info user
        if (!photo) {
            throw new NotFoundException(`Photo with id ${input_id} not found`);
        }
        // save all category names into array
        photo.category_names = photo.categories.map(category => category.name);
        // delete categories data
        delete photo.categories;
        return photo;
    }


    async getPhotoByName(input_name: string) : Promise<Photo[]> {
        console.log("getPhotoByName() from photos service started!");
        const photos =  await this.photosRepository.find({
            where: {name: input_name},
            relations:['owner', 'categories'],
            select: {
                id: true,
                name: true,
                location: true,
                description: true,
                url: true,
                createdAt: true,
                modifiedAt: true,
                owner: {
                    id: true,
                    email: true,
                    name: true
                },
                categories: {
                    name: true
                }
            }
        });
        // if photo with id does not exist info user
        if (!photos || photos.length == 0) {
            throw new NotFoundException(`Photo with name ${input_name} not found`);
        }
        // save all category names into array
        photos.forEach( (photo) => {
        photo.category_names = photo.categories.map(category => category.name);
        // delete categories data
        delete photo.categories;
        })
        return photos;
    }


    async updatePhotoById(input_id: string, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
        console.log("updatePhotoById() from photos service started!");
        console.log(JSON.stringify(updatePhotoDto))
        // separate category_names from other data
        const { category_names, ...updateData } = updatePhotoDto;
        await this.photosRepository.update({id: input_id}, updateData);
        // now, after update completed, find and return updated photo
        const photo = await this.photosRepository.findOne({
            where: {id: input_id},
            relations: ["owner", "categories"]
        })
        // if photo with id not found ,info user
        if (!photo) {
            throw new NotFoundException(`Photo with id ${input_id} not found`);
        }
        // if input contained category_names update also those...
        if (category_names) {
            const categories = await this.categoriesRepo.findBy({
                name: In(category_names)
            });
            // if length of categories found by name is different, it means
            // some given names were false, so now we use the filter
            // to tell user which names were false
            if (categories.length !== category_names.length) {
                // if a category name is found from categories
                // it is not included inside missingCategories
                // but those category_names that are not found inside
                // categories will be included
                const missingCategories = category_names.filter(
                    name => !categories.some(category => category.name === name)
                );
                throw new NotFoundException(`Categories not found: ${missingCategories.join(', ')}`);
            }
            // update categories of photo, categories is the ManyToMany relation between
            photo.categories = categories;
            await this.photosRepository.save(photo);
        }
        return photo;
    }


    async deletePhotoById(input_id: string): Promise<Photo> {
        console.log("deletePhotoById() from photos service started!");
        // get the 'to be removed' photo 
        const photo = await this.photosRepository.findOne({
            where: {id: input_id}
        })
        if (!photo) {
            throw new NotFoundException(`Photo with id ${input_id} not found`);
        }
        // delete photo based on input id and return it
        await this.photosRepository.delete(input_id);
        return photo;
    }
}
