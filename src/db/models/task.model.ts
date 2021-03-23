import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { TaskStatus } from 'src/tasks/task-status.enum';

@Table({ timestamps: false })
export class Task extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  status: TaskStatus;
}
