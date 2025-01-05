import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollegeWiseCourse } from './entities/college-wise-course.entity';
import { CreateCollegeWiseCourseDto } from './dto/create-college-wise-course.dto';

@Injectable()
export class CollegeWiseCourseService {
  constructor(
    @InjectRepository(CollegeWiseCourse)
    private readonly collegeWiseCourseRepository: Repository<CollegeWiseCourse>,
  ) {}

  async create(
    createCollegeWiseCourseDto: CreateCollegeWiseCourseDto,
  ): Promise<CollegeWiseCourse> {
    const course = this.collegeWiseCourseRepository.create(
      createCollegeWiseCourseDto,
    );
    return this.collegeWiseCourseRepository.save(course);
  }

  async findAll(collegeId: number): Promise<CollegeWiseCourse[]> {
    return this.collegeWiseCourseRepository.find({
      where: { college: { id: collegeId } },
      order: { course_fee: 'DESC' },
    });
  }

  async findOne(id: number): Promise<CollegeWiseCourse> {
    const course = await this.collegeWiseCourseRepository.findOne({
      where: { id },
    });
    if (!course) {
      throw new Error(`Course with id ${id} not found`);
    }
    return course;
  }

  async update(
    id: number,
    updateCollegeWiseCourseDto: CreateCollegeWiseCourseDto,
  ): Promise<CollegeWiseCourse> {
    await this.collegeWiseCourseRepository.update(
      id,
      updateCollegeWiseCourseDto,
    );
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.collegeWiseCourseRepository.delete(id);
  }

  async getCoursesByCollegeId(collegeId: number): Promise<CollegeWiseCourse[]> {
    return this.collegeWiseCourseRepository.find({
      where: { college: { id: collegeId } },
      order: { course_fee: 'DESC' },
    });
  }
}
