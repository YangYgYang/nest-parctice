import { Strategy ,IStrategyOptions} from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(
    private authService: AuthService,
    ) {
       super(
        //默認會是usernameField:'username'
        {usernameField:'email',} as IStrategyOptions
        );
    }

//    async validate(username: string, password: string): Promise<any> {
   async validate(email:string,password: string){
    console.log('進到local strategu')
       const foundUser = await this.authService.loginValidate(email, password);
       if (!foundUser) {
           throw new UnauthorizedException();
       }

       return foundUser;
   }
}