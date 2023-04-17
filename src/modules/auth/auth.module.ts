import { Module,Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { UserModule } from '../../modules/user/user.module';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';

@Module({
    imports:[
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60m' },
        })],
    controllers: [AuthController],
    providers: [AuthService,LocalStrategy,UserService]
  })

  export class AuthModule {}