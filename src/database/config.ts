import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Lists } from 'src/modules/list/entities/list.entity';

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'docker',
//   database: 'postgres',
//   entities: [User, Lists],
//   migrations: ['src/database/migrations/*.js'],
//   // migrationsTableName: 'typeorm_migrations',
//   synchronize: true,
//   logging: 'all',
// };

export function getConfig() {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'postgres',
    synchronize: false,
    entities: [User, Lists],
    migrations: ['dist/src/database/migrations/*.js'],
    // migrations: ['src/database/migrations/*.js'],
    // subscribers: ['src/subscriber/**/*.ts'],
    logging: 'all',
    // cli: {
    //   entitiesDir: 'src/entity',
    //   migrationsDir: 'database/migrations',
    //   subscribersDir: 'src/subscriber',
    // },
  } as DataSourceOptions;
}
