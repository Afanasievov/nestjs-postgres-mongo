import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateLessonInput } from './create-lesson.input';
import { LessonService } from './lesson.service';
import { LessonListType, LessonType } from './lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query((returns) => LessonListType)
  lessonList(): Promise<LessonListType> {
    return this.lessonService.getLessonList();
  }

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string): Promise<LessonType> {
    return this.lessonService.getLesson(id);
  }

  @Mutation((returns) => LessonType)
  createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput): Promise<LessonType> {
    return this.lessonService.createLesson(createLessonInput);
  }
}
