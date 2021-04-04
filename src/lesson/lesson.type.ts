import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { StudentType } from 'src/student/student.type';

@ObjectType('Lesson')
export class LessonType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field((type) => [StudentType])
  students: string[];
}

@ObjectType('LessonList')
export class LessonListType {
  @Field((type) => [LessonType])
  items: LessonType[];

  @Field((type) => Int)
  totalCount: number;
}
