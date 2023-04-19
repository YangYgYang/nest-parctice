import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
    private jwtService: JwtService
    ) {}

  async loginValidate(email: string, password: string) {
    const user = await this.userRepository.findOne({where:{email}});
    if (!user) {
      throw new BadRequestException('email或密碼不正確');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('email或密碼不正確');
    }
    delete user.password

    const payload = { email: user.email, sub: user.id }
    const access_token = this.jwtService.sign(payload)

    return {user,access_token};
  }
  
  // async validateUser(user: User) {
  //   const payload = { email: user.email, sub: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

//   async refresh(user: User) {
//     const payload = { email: user.email, sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
}