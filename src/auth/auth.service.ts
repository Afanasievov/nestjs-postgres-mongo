import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.model';
import { UserApi } from './dto/user-api.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(@InjectModel(User) private readonly userModel: typeof User, private readonly jwtService: JwtService) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userModel.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<UserApi> {
    const user = await this.userModel.validateUserPassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username };
    user.accessToken = this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

    return user;
  }
}
