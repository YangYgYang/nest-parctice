import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from './modules/list/list.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AuthService } from './modules/auth/auth.service';
import { UserService } from './modules/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "database.db",
      entities: [User],
      synchronize: true
    }),
    AuthModule,
    UserModule,
    ListModule,    
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    })
  ],
  providers: [AuthService,UserService],
  controllers: [AuthController]
})
export class AppModule {}
