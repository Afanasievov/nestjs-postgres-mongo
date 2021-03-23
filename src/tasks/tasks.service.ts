import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from 'src/db/models/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private readonly taskModel: typeof Task) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskModel.findAllWithFilters(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskModel.findByPk(id);

    if (!found) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const created = await this.taskModel.create(createTaskDto);
    return created;
  }

  async deleteTask(id: string): Promise<boolean> {
    const removed = await this.taskModel.destroy({ where: { id } });
    return removed === 1;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const [count, tasks] = await this.taskModel.update(
      { status },
      { where: { id }, fields: ['status'], returning: true },
    );

    if (!count) {
      throw new BadRequestException(`Task with ID '${id}' not updated`);
    }

    return tasks[0];
  }
}
