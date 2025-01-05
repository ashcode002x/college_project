import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get(':id')
  async getCity(@Param('id') id: string) {
    return this.citiesService.findOne(Number(id));
  }

  @Get()
  async getAllCities() {
    return this.citiesService.findAll();
  }
}