import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { State } from '../../states/entities/state.entity';
import { CollegePlacement } from '../../college-placement/entities/college-placement.entity';
import { CollegeWiseCourse } from '../../college-wise-course/entities/college-wise-course.entity';

@Entity('colleges')
export class College {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  score!: number;

  @ManyToOne(() => City, (city) => city.colleges)
  city!: City;

  @ManyToOne(() => State, (state) => state.colleges)
  state!: State;

  @OneToMany(() => CollegePlacement, (placement) => placement.college)
  placements!: CollegePlacement[];

  @OneToMany(() => CollegeWiseCourse, (course) => course.college)
  courses!: CollegeWiseCourse[];
}
