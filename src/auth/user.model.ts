import { Model } from 'sequelize';
import { Column, DataType, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  username: string;

  @Column
  password: string;
}
