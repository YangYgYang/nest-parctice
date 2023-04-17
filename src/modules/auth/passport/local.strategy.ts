import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { privateDecrypt } from 'crypto';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(
    private authService: AuthService,
    ) {
       super();
    }

//    async validate(username: string, password: string): Promise<any> {
   async validate(username: string, password: string){
       const foundUser = await this.authService.validateUser(username, password);
       if (!foundUser) {
           throw new UnauthorizedException();
       }

       return foundUser;
   }
}