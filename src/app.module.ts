import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from './modules/list/list.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
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
  ],
})
export class AppModule {}
