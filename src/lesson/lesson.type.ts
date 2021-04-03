import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

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
}

@ObjectType('LessonList')
export class LessonListType {
  @Field((type) => [LessonType])
  items: LessonType[];

  @Field((type) => Int)
  totalCount: number;
}
