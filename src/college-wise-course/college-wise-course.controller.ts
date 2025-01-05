import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CollegeWiseCourseService } from './college-wise-course.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('college_courses')
export class CollegeWiseCourseController {
  constructor(
    private readonly collegeWiseCourseService: CollegeWiseCourseService,
  ) {}

  @Get(':college_id')
  async getCollegeCourses(@Param('college_id') collegeId: string) {
    return this.collegeWiseCourseService.getCoursesByCollegeId(
      Number(collegeId),
    );
  }
}
