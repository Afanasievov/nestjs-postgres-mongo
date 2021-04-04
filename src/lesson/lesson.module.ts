import { LessonResolver } from './lesson.resolver';
import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from '../student/student.module';
import { LessonRepository } from './lesson.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LessonRepository]), StudentModule],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}
