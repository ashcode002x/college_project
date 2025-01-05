import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College } from './entities/college.entity';
import { CollegePlacement } from '../college-placement/entities/college-placement.entity';

@Injectable()
export class CollegesService {
  constructor(
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
    @InjectRepository(CollegePlacement)
    private readonly collegePlacementRepository: Repository<CollegePlacement>,
  ) {}

  async getAvgSection(collegeId: number) {
    return this.collegePlacementRepository
      .createQueryBuilder('placement')
      .select('placement.year')
      .addSelect('AVG(placement.highest_placement)', 'avg_highest_placement')
      .addSelect('AVG(placement.average_placement)', 'avg_average_placement')
      .addSelect('AVG(placement.median_placement)', 'avg_median_placement')
      .addSelect('AVG(placement.placement_rate)', 'avg_placement_rate')
      .where('placement.college_id = :collegeId', { collegeId })
      .andWhere('placement.highest_placement IS NOT NULL')
      .andWhere('placement.average_placement IS NOT NULL')
      .andWhere('placement.median_placement IS NOT NULL')
      .andWhere('placement.placement_rate IS NOT NULL')
      .andWhere('placement.highest_placement != 0')
      .andWhere('placement.average_placement != 0')
      .andWhere('placement.median_placement != 0')
      .andWhere('placement.placement_rate != 0')
      .groupBy('placement.year')
      .getRawMany();
  }

  async getPlacementSection(collegeId: number) {
    const placements = await this.collegePlacementRepository.find({
      where: { college: { id: collegeId } },
      order: { year: 'DESC' },
    });

    const placementSection = placements.filter(
      (placement) =>
        placement.highest_placement !== null &&
        placement.average_placement !== null &&
        placement.median_placement !== null &&
        placement.placement_rate !== null &&
        placement.highest_placement !== 0 &&
        placement.average_placement !== 0 &&
        placement.median_placement !== 0 &&
        placement.placement_rate !== 0,
    );

    for (let i = 0; i < placementSection.length - 1; i++) {
      const currentYear = placementSection[i];
      const previousYear = placementSection[i + 1];
      if (currentYear.placement_rate > previousYear.placement_rate) {
        currentYear['placement_trend'] = 'UP';
      } else if (currentYear.placement_rate < previousYear.placement_rate) {
        currentYear['placement_trend'] = 'DOWN';
      } else {
        currentYear['placement_trend'] = 'STABLE';
      }
    }

    return placementSection;
  }

  async getColleges(city?: string, state?: string): Promise<College[]> {
    const query = this.collegeRepository.createQueryBuilder('college');

    if (city) {
      query.where('college.city_id = :city', { city });
    }

    if (state) {
      query.andWhere('college.state_id = :state', { state });
    }

    return query.orderBy('college.score', 'DESC').getMany();
  }
}
