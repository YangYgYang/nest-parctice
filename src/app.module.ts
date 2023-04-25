import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from './modules/list/list.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
// import { typeOrmConfig } from './database/config';
import { getConfig } from './database/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(getConfig()),
    // TypeOrmModule.forRoot({ ...typeOrmConfig, autoLoadEntities: true }),
    AuthModule,
    UserModule,
    ListModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
