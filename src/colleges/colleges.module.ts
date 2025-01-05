import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegesController } from './colleges.controller';
import { CollegesService } from './colleges.service';
import { College } from './entities/college.entity';
import { CollegePlacement } from '../college-placement/entities/college-placement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([College, CollegePlacement])],
  controllers: [CollegesController],
  providers: [CollegesService],
  exports: [CollegesService],
})
export class CollegesModule {}
