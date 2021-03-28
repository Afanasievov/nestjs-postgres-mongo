import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.model';

type JwtPayload = {
  username: string;
  iat: number;
  exp: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: 'top-secret' });
  }

  async validate(jwt: JwtPayload): Promise<User> {
    const { username } = jwt;
    const user = await this.userModel.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
