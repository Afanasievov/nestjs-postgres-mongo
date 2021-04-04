import { LessonResolver } from './lesson.resolver';
import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from '../student/student.module';
import { Lesson } from './lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), StudentModule],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}
