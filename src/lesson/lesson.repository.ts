import { EntityRepository, MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';
import { LessonListType, LessonType } from './lesson.type';
import { CreateLessonInput } from './create-lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';

@EntityRepository(Lesson)
export class LessonRepository extends MongoRepository<Lesson> {
  async getLessonList(): Promise<LessonListType> {
    const [items, totalCount] = await this.findAndCount();
    return { items, totalCount };
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<LessonType> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.create({ id: uuid(), name, startDate, endDate, students });

    return this.save(lesson);
  }

  async assignStudentsToLesson(assignStudentsToLessonInput: AssignStudentsToLessonInput): Promise<LessonType> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    const lesson = await this.findOne({ id: lessonId });
    const students = [...lesson.students, ...studentIds].filter((id, i, arr) => arr.indexOf(id) === i);
    lesson.students = students;
    return this.save(lesson);
  }
}
