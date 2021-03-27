import { Model } from 'sequelize';
import { AllowNull, Column, DataType, Length, Table, Unique } from 'sequelize-typescript';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
  @Column
  password: string;

  @AllowNull(false)
  @Column
  salt: string;

  static async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await User.hashPassword(password, salt);
      await this.create({ username, password: hashedPassword, salt });
    } catch (error) {
      if (error?.parent?.code === alreadyExists) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException();
    }
  }

  static async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ where: { username } });

    if (user && (await User.validatePassword(password, user.password, user.salt))) {
      return user;
    }

    return null;
  }

  static async validatePassword(password: string, passwordDb: string, saltDb: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, saltDb);
    return hash === passwordDb;
  }

  static async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
