import { Table, Model, Column, PrimaryKey } from 'sequelize-typescript';
import { TaskStatus } from './task.model';

@Table
export class TaskDB extends Model<TaskDB> {
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
