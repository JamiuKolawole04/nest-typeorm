import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from 'src/dtos';
import { UsersService } from 'src/services';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUsers(@Body() createUserDto: CreateUserDto) {
    const users = await this.userService.createUser(createUserDto);
    return {
      statusCode: 201,
      success: true,
      message: 'user created successfully',
    };
  }

  @Get()
  async getUsers() {
    const users = await this.userService.fetchUser();
    return {
      statusCode: 200,
      status: 'success',
      data: users,
    };
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateUser(id, updateUserDto);

    if (user.affected === 0) {
      throw new HttpException(
        'user with this id does not exist',
        HttpStatus.FORBIDDEN,
      );
    }

    return {
      statusCode: 200,
      success: true,
      message: 'user updated successfully',
    };
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.deleteUser(id);

    if (user.affected === 0) {
      throw new HttpException(
        'cant delete user with this id',
        HttpStatus.FORBIDDEN,
      );
    }

    return {
      statusCode: 200,
      success: true,
      message: 'user deleted successfully',
    };
  }
}
