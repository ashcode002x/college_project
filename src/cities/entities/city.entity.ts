import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { College } from '../../colleges/entities/college.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => College, (college) => college.city)
  colleges!: College[];
}
