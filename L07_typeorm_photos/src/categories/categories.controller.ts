import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-photo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Create a new category."})
    @ApiCreatedResponse({description: 'The new category was created successfully'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoriesService.insertCategory(createCategoryDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Find all categories."})
    @ApiOkResponse({description: 'All categories were found successfully'})
    @ApiNotFoundResponse({description: 'No categories were found'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async getCategories(): Promise<Category[]> {
        return await this.categoriesService.getCategories();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Find a category by id."})
    @ApiOkResponse({description: 'The category was found by id'})
    @ApiNotFoundResponse({description: 'There was no category with id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async getCategoryById(@Param('id') input_id: string): Promise<Category> {
        return await this.categoriesService.getCategoryById(input_id);
    }

    @Get('name/:name')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Find a category by name."})
    @ApiOkResponse({description: 'The category was found by name'})
    @ApiNotFoundResponse({description: 'There was no category with name'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async getCategoryByName(@Param('name') name: string): Promise<Category> {
        return await this.categoriesService.getCategoryByName(name);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Update a category."})
    @ApiOkResponse({description: 'The category was updated successfully'})
    @ApiNotFoundResponse({description: 'There was no category with id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async updateCategoryById(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        return await this.categoriesService.updateCategoryById(id, updateCategoryDto);
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Delete a category."})
    @ApiOkResponse({description: 'The category was deleted successfully'})
    @ApiNotFoundResponse({description: 'There was no category with id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async deleteCategoryById(@Param('id') id: string): Promise<Category> {
        return await this.categoriesService.deleteCategoryById(id);
    }

}
