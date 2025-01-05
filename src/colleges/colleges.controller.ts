import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CollegesService } from './colleges.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('colleges')
export class CollegesController {
  constructor(private readonly collegesService: CollegesService) {}

  @Get(':college_id')
  async getCollegeData(@Param('college_id') collegeId: string) {
    const avgSection = await this.collegesService.getAvgSection(
      Number(collegeId),
    );
    const placementSection = await this.collegesService.getPlacementSection(
      Number(collegeId),
    );
    return { avg_section: avgSection, placement_section: placementSection };
  }

  @Get()
  async getColleges(
    @Query('city') city?: string,
    @Query('state') state?: string,
  ) {
    return this.collegesService.getColleges(city ?? '', state ?? '');
  }
}
