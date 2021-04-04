import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository])],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
