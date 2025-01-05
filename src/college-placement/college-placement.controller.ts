import { Controller, Get, Param } from '@nestjs/common';
import { CollegePlacementService } from './college-placement.service';

@Controller('college_data')
export class CollegePlacementController {
  constructor(private readonly collegePlacementService: CollegePlacementService) {}

  @Get(':college_id/avg_section')
  async getAveragePlacementData(@Param('college_id') collegeId: string) {
    return this.collegePlacementService.getAveragePlacementData(Number(collegeId));
  }

  @Get(':college_id/placement_section')
  async getPlacementData(@Param('college_id') collegeId: string) {
    return this.collegePlacementService.getPlacementData(Number(collegeId));
  }
}