import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':email')
  async getUser(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':email')
  async updateUser(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(email, updateUserDto);
  }

  @Delete(':email')
  async deleteUser(@Param('email') email: string) {
    return this.usersService.remove(email);
  }
}
