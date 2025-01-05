import { createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { City } from '../cities/entities/city.entity';
import { State } from '../states/entities/state.entity';
import { College } from '../colleges/entities/college.entity';
import { CollegePlacement } from '../college-placement/entities/college-placement.entity';
import { CollegeWiseCourse } from '../college-wise-course/entities/college-wise-course.entity';
import { User } from '../users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const host = configService.get<string>('DATABASE_HOST');
      const port = configService.get<number>('DATABASE_PORT');
      const username = configService.get<string>('DATABASE_USER');
      const password = configService.get<string>('DATABASE_PASSWORD');
      const database = configService.get<string>('DATABASE_NAME');

      console.log(
        `Connecting to database at ${host}:${port} with user ${username}`,
      );

      try {
        const dataSource = await createConnection({
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
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

        console.log('Successfully connected to the database');
        return dataSource;
      } catch (error) {
        console.error('Error connecting to the database', error);
        throw error;
      }
    },
    inject: [ConfigService],
  },
];
