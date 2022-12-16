import { Controller, Get, Post, Body } from '@nestjs/common';

import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UsersService } from 'src/services';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    getUsers(){}

    @Post()
    createUsers(@Body() createUserDto: CreateUserDto){
        this.userService.createUser(createUserDto)
    }
}
