import { Op, FindOptions, WhereOptions } from 'sequelize';
import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { TaskStatus } from 'src/tasks/task-status.enum';
import { GetTasksFilterDto } from 'src/tasks/dto/get-tasks-filter.dto';

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

  static findAllWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const where: WhereOptions = { [Op.or]: [] };
    if (status) {
      where[Op.or].push({ status });
    }
    if (search) {
      where[Op.or].push({
        [Op.or]: [
          { title: { [Op.substring]: search } },
          { description: { [Op.substring]: search } },
        ],
      });
    }
    const options: FindOptions = {};
    if (Object.keys(where[Op.or]).length) {
      options.where = where;
    }
    return this.findAll(options);
  }
}
