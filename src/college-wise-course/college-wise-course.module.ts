import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegeWiseCourseController } from './college-wise-course.controller';
import { CollegeWiseCourseService } from './college-wise-course.service';
import { CollegeWiseCourse } from './entities/college-wise-course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollegeWiseCourse])],
  controllers: [CollegeWiseCourseController],
  providers: [CollegeWiseCourseService],
  exports: [CollegeWiseCourseService],
})
export class CollegeWiseCourseModule {}