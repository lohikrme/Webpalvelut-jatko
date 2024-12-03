import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Photo } from 'src/photos/entities/photo.entity';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private readonly categoriesRepo: Repository<Category>) {}



    async getCategories(): Promise<Category[]> {
        console.log("getCategories() from categories service started!");
        const categories = await this.categoriesRepo.find({relations: ['photos']});

        // filter a bit unnecessary information off photos...
        categories.forEach( (category) => {
            category.photos = category.photos.map(p => {
                const photo = new Photo();
                Object.assign(photo, {
                    id: p.id, 
                    name: p.name, 
                    url: p.url
                })
                return photo;
            })
        })
        return categories;
    }



    async getCategoryByName(input_name): Promise<Category> {
        console.log("getCategoryByName() from categories service started!");
        const categories = await this.categoriesRepo.find({ 
            where: {name: input_name},
            relations: ['photos']
        });

        // filter a bit unnecessary information off photos...
        categories.forEach( (category) => {
            category.photos = category.photos.map(p => {
                const photo = new Photo();
                Object.assign(photo, {
                    id: p.id, 
                    name: p.name, 
                    url: p.url
                })
                return photo;
            })
        })

        return categories[0];
    }

    
    async insertCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        console.log("createCategory() from categories service started!");
        const category = await this.categoriesRepo.create(createCategoryDto);
        return await this.categoriesRepo.save(category);
    }

}
