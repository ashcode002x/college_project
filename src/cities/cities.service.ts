import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const city = this.cityRepository.create(createCityDto);
    return this.cityRepository.save(city);
  }

  async findAll(): Promise<City[]> {
    return this.cityRepository.find();
  }

  async findOne(id: number): Promise<City> {
    const city = await this.cityRepository.findOne({ where: { id } });
    if (!city) {
      throw new Error(`City with id ${id} not found`);
    }
    return city;
  }

  async update(id: number, updateCityDto: CreateCityDto): Promise<City> {
    await this.cityRepository.update(id, updateCityDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cityRepository.delete(id);
  }
}