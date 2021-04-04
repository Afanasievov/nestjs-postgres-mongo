import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { StudentListType, StudentType } from './student.type';

@Injectable()
export class StudentService {
  constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) {}

  async getStudentList(): Promise<StudentListType> {
    const [items, totalCount] = await this.studentRepository.findAndCount();
    return { items, totalCount };
  }

  async getStudent(id: string): Promise<StudentType> {
    return this.studentRepository.findOne({ id });
  }

  async createStudent(createStudentInput: CreateStudentInput): Promise<StudentType> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({ id: uuid(), firstName, lastName });

    return this.studentRepository.save(student);
  }
}
