import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { College } from '../../colleges/entities/college.entity';

@Entity('college_placements')
export class CollegePlacement {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => College, (college) => college.placements)
  college!: College;

  @Column()
  year!: number;

  @Column({ nullable: true })
  highest_placement!: number;

  @Column()
  average_placement!: number;

  @Column()
  median_placement!: number;

  @Column()
  placement_rate!: number;

  placement_trend?: 'UP' | 'DOWN' | 'STABLE';
}
