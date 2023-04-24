import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      //默認會是usernameField:'username'
      { usernameField: 'email' } as IStrategyOptions,
    );
  }

  async validate(email: string, password: string) {
    const foundUser = await this.authService.loginValidate(email, password);
    //passport會將foundUser塞到req.user裡面，讓controller可以在req.user中拿到登入者資訊
    return foundUser;
  }
}
