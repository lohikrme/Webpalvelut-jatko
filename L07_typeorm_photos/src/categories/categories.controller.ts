import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-photo.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Get()
    // @UseGuards(JwtAuthGuard)
    async getCategories(): Promise<Category[]> {
        return await this.categoriesService.getCategories();
    }

    @Get(':id')
    // @UseGuards(JwtAuthGuard)
    async getCategoryById(@Param('id') input_id: string): Promise<Category> {
        return await this.categoriesService.getCategoryById(input_id);
    }

    @Get('name/:name')
    // @UseGuards(JwtAuthGuard)
    async getCategoryByName(@Param('name') name: string): Promise<Category> {
        return await this.categoriesService.getCategoryByName(name);
    }

    @Post()
    // @UseGuards(JwtAuthGuard)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoriesService.insertCategory(createCategoryDto);
    }

    @Delete()
    // @UseGuards(JwtAuthGuard)
    async deleteCategoryById(@Param('id') id: string): Promise<Category> {
        return await this.categoriesService.deleteCategoryById(id);
    }


    @Put(':id')
    // @UseGuards(JwtAuthGuard)
    async updateCategoryById(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        return await this.categoriesService.updateCategoryById(id, updateCategoryDto);
    }

}
