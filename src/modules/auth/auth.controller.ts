import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { AuthUserDto } from '../auth/dto/auth-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: '使用者登入' })
  @ApiBody({
    type: AuthUserDto,
  })
  @ApiResponse({
    status: 200,
    description: '回傳該使用者資訊.',
    type: UpdateUserDto,
  })
  async login(@Req() req) {
    return req.user;
  }
}
