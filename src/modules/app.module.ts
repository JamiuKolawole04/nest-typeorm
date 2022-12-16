import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '../controllers';
import { AppService } from '../services';
import { User } from '../entities/user';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "07086314122",
    database: "nestjs_mysql_tutorial",
    entities: [User],
    synchronize: true

  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
