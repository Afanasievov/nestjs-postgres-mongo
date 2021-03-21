import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [SequelizeModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
