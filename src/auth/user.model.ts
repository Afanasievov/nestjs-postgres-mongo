import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Model } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  Table,
  Unique,
} from 'sequelize-typescript';
import { BadRequestException } from '@nestjs/common';

const alreadyExists = 'username already exists';

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Unique({ name: 'username', msg: alreadyExists })
  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Column
  password: string;

  static async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      await this.create(authCredentialsDto);
    } catch (error) {
      if (error.message === alreadyExists) {
        throw new BadRequestException(alreadyExists);
      }
      throw error;
    }
  }
}
