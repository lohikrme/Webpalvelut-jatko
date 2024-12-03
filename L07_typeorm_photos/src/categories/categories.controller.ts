import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Get()
    // @UseGuards(JwtAuthGuard)
    async getCategories(): Promise<Category[]> {
        return await this.categoriesService.getCategories();
    }

    @Get(':name')
    // @UseGuards(JwtAuthGuard)
    async getCategory(@Param('name') name: string): Promise<Category> {
        return await this.categoriesService.getCategoryByName(name);
    }

    @Post()
    // @UseGuards(JwtAuthGuard)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoriesService.insertCategory(createCategoryDto);
    }
}
