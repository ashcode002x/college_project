import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { City } from './src/cities/entities/city.entity';
import { State } from './src/states/entities/state.entity';
import { College } from './src/colleges/entities/college.entity';
import { CollegePlacement } from './src/college-placement/entities/college-placement.entity';
import { CollegeWiseCourse } from './src/college-wise-course/entities/college-wise-course.entity';
import { User } from './src/users/entities/user.entity';
import { config } from 'dotenv';

config(); 

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [
    City,
    State,
    College,
    CollegePlacement,
    CollegeWiseCourse,
    User,
  ],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });