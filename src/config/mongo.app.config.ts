import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Lesson } from 'src/lesson/lesson.entity';
import { Student } from 'src/student/student.entity';

export const mongoConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost/education',
  synchronize: true,
  useUnifiedTopology: true,
  entities: [Lesson, Student],
};
