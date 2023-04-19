import { ExtractJwt, Strategy,} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 constructor(
  private authService: AuthService
 ) {
   super({
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     ignoreExpiration: false,
     secretOrKey: 'process.env.secret',
   });
 }


 async validate(payload: any) {
   return { userId: payload.sub, email: payload.email };
 }

}