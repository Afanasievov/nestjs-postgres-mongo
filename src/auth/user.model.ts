import { Model } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  Length,
  Table,
  Unique,
} from 'sequelize-typescript';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { alreadyExists } from '../constants/error-codes';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Unique({ name: 'username', msg: 'username already exists' })
  @Length({ min: 4, max: 20 })
  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Length({ min: 8, max: 20 })
  @Column
  password: string;

  static async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      await this.create(authCredentialsDto);
    } catch (error) {
      if (error?.parent?.code === alreadyExists) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
