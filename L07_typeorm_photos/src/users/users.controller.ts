import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Create a new user. This endpoint is also used to create a new profile same time as user."})
    @ApiCreatedResponse({description: 'The user has been successfully created'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.insertUser(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Find all users. Shows also information of their photos."})
    @ApiOkResponse({description: 'All users were found successfully'})
    @ApiNotFoundResponse({description: 'No users were found'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async getUsers(): Promise<User[]> {
        return await this.usersService.findUsers();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Find a user by id. Shows also information of user's photos"})
    @ApiOkResponse({description: 'The user was found successfully with id'})
    @ApiNotFoundResponse({description: 'There was no user with id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async getUserById(@Param('id') id: string): Promise<User> {
        return await this.usersService.findUserById(id);
    }

    @Get('email/:email')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Find a user by email. Shows also information of user's photos"})
    @ApiOkResponse({description: 'The user was found successfully with email'})
    @ApiNotFoundResponse({description: 'There was no user with email'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async getUserByEmail(@Param('email') email: string): Promise<User> {
        return await this.usersService.findUserByEmail(email);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Update a user by id. This endpoint is also used to update profiles same time as user."})
    @ApiOkResponse({description: 'The user was successfully updated'})
    @ApiNotFoundResponse({description: 'There was no user with id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async updateUserById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.usersService.updateUserById(id, updateUserDto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: "Delete a user by id. This endpoint is also used to delete profiles same time as user."})
    @ApiOkResponse({description: 'The user was successfully deleted'})
    @ApiNotFoundResponse({description: 'There was no user with id'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async deleteUserById(@Param('id') input_id: string): Promise<User> {
        return await this.usersService.deleteUserById(input_id);
    }
}
