import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userModel.signUp(authCredentialsDto);
  }
}
