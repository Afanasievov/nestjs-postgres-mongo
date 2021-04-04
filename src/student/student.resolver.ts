import { CreateStudentInput } from './create-student.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentListType, StudentType } from './student.type';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => StudentListType)
  studentList(): Promise<StudentListType> {
    return this.studentService.getStudentList();
  }

  @Query((returns) => StudentType)
  student(@Args('id') id: string): Promise<StudentType> {
    return this.studentService.getStudent(id);
  }

  @Mutation((returns) => StudentType)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput): Promise<StudentType> {
    return this.studentService.createStudent(createStudentInput);
  }
}
