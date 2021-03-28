import { Op, FindOptions, WhereOptions } from 'sequelize';
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.model';

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

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  static async findAllWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const where: WhereOptions = { [Op.or]: [] };
    if (status) {
      where[Op.or].push({ status });
    }
    if (search) {
      where[Op.or].push({
        [Op.or]: [{ title: { [Op.substring]: search } }, { description: { [Op.substring]: search } }],
      });
    }
    const options: FindOptions = {};
    if (Object.keys(where[Op.or]).length) {
      options.where = where;
    }
    return this.findAll(options);
  }
}
