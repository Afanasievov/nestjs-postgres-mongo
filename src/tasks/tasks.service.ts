import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../auth/user.model';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private readonly taskModel: typeof Task) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskModel.findAllWithFilters(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskModel.findOne({ where: { id, userId: user.id } });

    if (!found) {
      throw new NotFoundException(`Task with ID '${id}' has not been found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const created = await this.taskModel.create({ ...createTaskDto, userId: user.id });
    return created;
  }

  async deleteTask(id: string, user: User): Promise<boolean> {
    const removed = await this.taskModel.destroy({ where: { id, userId: user.id } });
    return removed === 1;
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    const [count, tasks] = await this.taskModel.update(
      { status },
      { where: { id, userId: user.id }, fields: ['status'], returning: true },
    );

    if (!count) {
      throw new BadRequestException(`Task with ID '${id}' has not updated`);
    }

    return tasks[0];
  }
}
