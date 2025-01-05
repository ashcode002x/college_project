import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);
    console.log('Successfully created a new user entry in the database');
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update({ email }, updateUserDto);
    return this.findOne(email);
  }

  async remove(email: string): Promise<void> {
    const deleteResult = await this.usersRepository.delete({ email });
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }
}
