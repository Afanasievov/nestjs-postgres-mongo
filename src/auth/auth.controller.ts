import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { User } from './user.model';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<Omit<User, 'password' | 'salt'>> {
    const user = await this.authService.signIn(authCredentialsDto);
    const result = user.toJSON() as User;
    delete result.password;
    delete result.salt;
    return result;
  }
}
