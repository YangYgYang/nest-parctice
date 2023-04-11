import { Module } from '@nestjs/common';
// import { UserModule } from 'src/modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { listModule } from 'src/modules/user/user.module';
import { ListModule } from './modules/list/list.module';
import { UserModule } from './modules/user/user.module';
import { Users } from './modules/user/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "database.db",
      entities: [Users],
      synchronize: true
    }),
    UserModule,
    ListModule
  ]
})
export class AppModule {}
