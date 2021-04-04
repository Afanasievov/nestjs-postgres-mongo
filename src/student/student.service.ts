import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './create-student.input';
import { StudentRepository } from './student.repository';
import { StudentListType, StudentType } from './student.type';

@Injectable()
export class StudentService {
  constructor(@InjectRepository(StudentRepository) private studentRepository: StudentRepository) {}

  async getStudentList(): Promise<StudentListType> {
    return this.studentRepository.getStudentList();
  }

  async getStudent(id: string): Promise<StudentType> {
    return this.studentRepository.findOne({ id });
  }

  async createStudent(createStudentInput: CreateStudentInput): Promise<StudentType> {
    return this.studentRepository.createStudent(createStudentInput);
  }

  async getManyStudents(studentIds: string[]): Promise<StudentType[]> {
    return this.studentRepository.getManyStudents(studentIds);
  }
}
