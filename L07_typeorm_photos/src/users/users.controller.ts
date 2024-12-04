import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    // @UseGuards(JwtAuthGuard)
    async getUsers(): Promise<User[]> {
        return await this.usersService.findUsers();
    }

    @Post()
    // @UseGuards(JwtAuthGuard)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.insertUser(createUserDto);
    }

    @Get(':id')
    // @UseGuards(JwtAuthGuard)
    async getUser(@Param('id') id: string): Promise<User> {
        return await this.usersService.findUserById(id);
    }

    @Get('email/:email')
    // @UseGuards(JwtAuthGuard)
    async getUserByEmail(@Param('email') email: string): Promise<User> {
        return await this.usersService.findUserByEmail(email);
    }
    

    @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    async deleteUserById(@Param('id') input_id: string): Promise<User> {
        return await this.usersService.deleteUserById(input_id);
    }


    @Put(':id')
    // @UseGuards(JwtAuthGuard)
    async updateUserById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.usersService.updateUserById(id, updateUserDto)
    }
}
