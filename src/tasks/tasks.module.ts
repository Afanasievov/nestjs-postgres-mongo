import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from 'src/db/models/task.model';

@Module({
  imports: [SequelizeModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
