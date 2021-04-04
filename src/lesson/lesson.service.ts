import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './create-lesson.input';
import { LessonListType, LessonType } from './lesson.type';
import { AssignStudentToLessonInput } from './assign-students-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(@InjectRepository(Lesson) private lessonRepository: Repository<Lesson>) {}

  async getLessonList(): Promise<LessonListType> {
    const [items, totalCount] = await this.lessonRepository.findAndCount();
    return { items, totalCount };
  }

  async getLesson(id: string): Promise<LessonType> {
    return this.lessonRepository.findOne({ id });
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<LessonType> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({ id: uuid(), name, startDate, endDate, students });

    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(assignStudentsToLessonInput: AssignStudentToLessonInput): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    const students = [...lesson.students, ...studentIds].filter((id, i, arr) => arr.indexOf(id) === i);
    lesson.students = students;
    return this.lessonRepository.save(lesson);
  }
}
