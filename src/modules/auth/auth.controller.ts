import { Controller, Post, UseGuards, Req, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiOperation,ApiResponse,ApiBody,ApiHeader } from '@nestjs/swagger'
import { type } from 'os';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { AuthUserDto } from '../auth/dto/auth-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: '使用者登入' })
  @ApiResponse({ 
    status: 200, 
    description: '回傳該使用者資訊.' ,
    type:UpdateUserDto
  })
  @Post('login')
  @ApiBody({
    type:AuthUserDto
  })
  async login(@Req() req) {
    console.log(req)
    return req.user;
  }

}