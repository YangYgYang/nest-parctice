import { Module } from '@nestjs/common';
// import { UserModule } from 'src/modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { listModule } from 'src/modules/user/user.module';
import { ListModule } from './modules/list/list.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { AuthService } from './modules/auth/auth.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "database.db",
      entities: [User],
      synchronize: true
    }),
    UserModule,
    ListModule,
    
  ],
  providers: [AuthService]
})
export class AppModule {}
