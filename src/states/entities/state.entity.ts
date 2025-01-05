import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { College } from '../../colleges/entities/college.entity';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => College, (college) => college.state)
  colleges!: College[];
}
