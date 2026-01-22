import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {databaseConfig} from './config/db.config';
import { AppModules } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal : true
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    ...AppModules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
