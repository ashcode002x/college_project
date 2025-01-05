import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  fullName!: string;
}
