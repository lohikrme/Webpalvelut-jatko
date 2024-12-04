import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Photo } from 'src/photos/entities/photo.entity';
import { UpdateCategoryDto } from './dto/update-photo.dto';

@Injectable()
export class CategoriesService {

    constructor(@InjectRepository(Category) private readonly categoriesRepo: Repository<Category>) {}


    async insertCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        console.log("createCategory() from categories service started!");
        const category = await this.categoriesRepo.create(createCategoryDto);
        
        try {
            return await this.categoriesRepo.save(category);
        }
        // handle if cant add new user
        // mysql specific error is 'ER_DUP_ENTRY'
        // postgres error code would be '23505'
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Category name already exists');
            }
            else {
                throw new InternalServerErrorException('An internal server error while creating user');
            }
        }
    }
    
    
    async getCategories(): Promise<Category[]> {
        console.log("getCategories() from categories service started!");
        const categories = await this.categoriesRepo.find({
            relations: ['photos'],
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                modifiedAt: true,
                photos: {
                    id: true,
                    name: true,
                    description: true,
                    url: true
                }
            }
        });
        // this would be alternative way to filter if select was impossible to do
            /*
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
            */
        return categories;
    }


    async getCategoryById(input_id): Promise<Category> {
        console.log("getCategoryById() from categories service started!");
        const category = await this.categoriesRepo.findOne({ 
            where: {id: input_id},
            relations: ['photos'],
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                modifiedAt: true,
                photos: {
                    id: true,
                    name: true,
                    description: true,
                    url: true
                }
            }
        });
        // info user if category was not found:
        if (!category) {
            throw new NotFoundException(`Category with id ${input_id} not found`);
          }
        return category;
    }


    async getCategoryByName(input_name): Promise<Category> {
        console.log("getCategoryByName() from categories service started!");
        const category = await this.categoriesRepo.findOne({ 
            where: {name: input_name},
            relations: ['photos'],
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                modifiedAt: true,
                photos: {
                    id: true,
                    name: true,
                    description: true,
                    url: true
                }
            }
        });
        // info user if category was not found:
        if (!category) {
            throw new NotFoundException(`Category with name ${input_name} not found`);
        }
        return category;
    }


    async updateCategoryById(input_id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        console.log("updateCategoryById() from categories service started!");
        console.log(JSON.stringify(updateCategoryDto))
        await this.categoriesRepo.update({id: input_id}, updateCategoryDto);
        // now, after update completed, find and return updated category
        const category = await this.categoriesRepo.findOne({
            where: {id: input_id}
        })
        if (!category) {
            throw new NotFoundException(`Category with id ${input_id} not found`);
        }
        return category;
    }


    async deleteCategoryById(input_id: string): Promise<Category> {
        console.log("deleteCategoryById() from categories service started!");
        // get the 'to be removed' category
        const category = await this.categoriesRepo.findOne({
            where: {id: input_id}
        })
        // delete based on input id
        await this.categoriesRepo.delete(input_id);
        // return the removed category
        return category;
    }



}
