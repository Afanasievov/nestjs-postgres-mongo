import { Table, Model, Column, PrimaryKey } from 'sequelize-typescript';
import { TaskStatus } from 'src/tasks/task-status.enum';

@Table
export class Task extends Model<Task> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  status: TaskStatus;
}
