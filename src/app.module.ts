import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CollegesModule } from './colleges/colleges.module';
import { CollegePlacementModule } from './college-placement/college-placement.module';
import { CollegeWiseCourseModule } from './college-wise-course/college-wise-course.module';
import { CitiesModule } from './cities/cities.module';
import { StatesModule } from './states/states.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [
    AuthModule,
    CollegesModule,
    CollegePlacementModule,
    CollegeWiseCourseModule,
    CitiesModule,
    StatesModule,
    UsersModule,
    TasksModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('DATABASE_HOST');
        const port = configService.get<number>('DATABASE_PORT');
        const username = configService.get<string>('DATABASE_USER');
        const password = configService.get<string>('DATABASE_PASSWORD');
        const database = configService.get<string>('DATABASE_NAME');

        console.log(
          `Connecting to database at ${host}:${port} with user ${username}`,
        );

        const connectionOptions: TypeOrmModuleOptions = {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          synchronize: true,
        };

        return connectionOptions;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly connection: Connection) {}

  async onModuleInit() {
    try {
      await this.connection.query('SELECT 1');
      console.log('Successfully connected to the database');
    } catch (error) {
      console.error('Error connecting to the database', error);
    }
  }
}
