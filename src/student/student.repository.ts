import { EntityRepository, MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { StudentListType, StudentType } from './student.type';

@EntityRepository(Student)
export class StudentRepository extends MongoRepository<Student> {
  async getStudentList(): Promise<StudentListType> {
    const [items, totalCount] = await this.findAndCount();
    return { items, totalCount };
  }

  async createStudent(createStudentInput: CreateStudentInput): Promise<StudentType> {
    const { firstName, lastName } = createStudentInput;
    const student = this.create({ id: uuid(), firstName, lastName });

    return this.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<StudentType[]> {
    return this.find({ where: { id: { $in: studentIds } } });
  }
}
