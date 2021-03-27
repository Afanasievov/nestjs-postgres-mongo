import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userModel.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const username = await this.userModel.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException();
    }
  }
}
