import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollegePlacement } from './entities/college-placement.entity';
import { CreateCollegePlacementDto } from './dto/create-college-placement.dto';

@Injectable()
export class CollegePlacementService {
  constructor(
    @InjectRepository(CollegePlacement)
    private readonly collegePlacementRepository: Repository<CollegePlacement>,
  ) {}

  async getAveragePlacementData(collegeId: number) {
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
      .orderBy('placement.year', 'ASC')
      .getRawMany();
  }

  async getPlacementData(collegeId: number) {
    const placements = await this.collegePlacementRepository
      .createQueryBuilder('placement')
      .where('placement.college_id = :collegeId', { collegeId })
      .andWhere('placement.highest_placement IS NOT NULL')
      .andWhere('placement.average_placement IS NOT NULL')
      .andWhere('placement.median_placement IS NOT NULL')
      .andWhere('placement.placement_rate IS NOT NULL')
      .andWhere('placement.highest_placement != 0')
      .andWhere('placement.average_placement != 0')
      .andWhere('placement.median_placement != 0')
      .andWhere('placement.placement_rate != 0')
      .getMany();

    const placementTrend = this.calculatePlacementTrend(placements);
    return placements.map((placement) => ({
      ...placement,
      placement_trend: placementTrend,
    }));
  }

  private calculatePlacementTrend(placements: CollegePlacement[]) {
    if (placements.length < 2) return null;

    const lastYear = placements[placements.length - 1];
    const secondLastYear = placements[placements.length - 2];

    if (lastYear.placement_rate > secondLastYear.placement_rate) {
      return 'UP';
    } else if (lastYear.placement_rate < secondLastYear.placement_rate) {
      return 'DOWN';
    }
    return null;
  }

  async create(createCollegePlacementDto: CreateCollegePlacementDto) {
    const placement = this.collegePlacementRepository.create(createCollegePlacementDto);
    return this.collegePlacementRepository.save(placement);
  }

  async update(id: number, updateCollegePlacementDto: CreateCollegePlacementDto) {
    await this.collegePlacementRepository.update(id, updateCollegePlacementDto);
    return this.collegePlacementRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return this.collegePlacementRepository.delete(id);
  }
}