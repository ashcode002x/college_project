import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './entities/state.entity';
import { CreateStateDto } from './dto/create-state.dto';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private statesRepository: Repository<State>,
  ) {}

  async create(createStateDto: CreateStateDto): Promise<State> {
    const state = this.statesRepository.create(createStateDto);
    return this.statesRepository.save(state);
  }

  async findAll(): Promise<State[]> {
    return this.statesRepository.find();
  }

  async findOne(id: number): Promise<State> {
    const state = await this.statesRepository.findOne({ where: { id } });
    if (!state) {
      throw new Error(`State with id ${id} not found`);
    }
    return state;
  }

  async update(id: number, updateStateDto: CreateStateDto): Promise<State> {
    await this.statesRepository.update(id, updateStateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.statesRepository.delete(id);
  }
}