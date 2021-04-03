import { Resolver, Query } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

@Resolver()
export class LessonResolver {
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: 'cos.fgkijhsd[p',
      name: 'Physics Class',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
