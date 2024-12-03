import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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

    @Get(':email')
    // @UseGuards(JwtAuthGuard)
    async getUserByEmail(@Param('email') email: string): Promise<User> {
        return await this.usersService.findUserByEmail(email);
    }

    // will need update user by email / id
    

    // will need delete user by email / id
}
