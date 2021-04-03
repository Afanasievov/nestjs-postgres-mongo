import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Student')
export class StudentType {
  @Field((type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

@ObjectType('StudentList')
export class StudentListType {
  @Field((type) => [StudentType])
  items: StudentType[];

  @Field((type) => Int)
  totalCount: number;
}
