import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonInput } from './create-lesson.input';
import { LessonListType, LessonType } from './lesson.type';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  constructor(@InjectRepository(LessonRepository) private lessonRepository: LessonRepository) {}

  async getLessonList(): Promise<LessonListType> {
    return this.lessonRepository.getLessonList();
  }

  async getLesson(id: string): Promise<LessonType> {
    return this.lessonRepository.findOne({ id });
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<LessonType> {
    return this.lessonRepository.createLesson(createLessonInput);
  }

  async assignStudentsToLesson(assignStudentsToLessonInput: AssignStudentsToLessonInput): Promise<LessonType> {
    return this.lessonRepository.assignStudentsToLesson(assignStudentsToLessonInput);
  }
}
