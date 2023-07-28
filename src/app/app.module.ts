import { Module } from '@nestjs/common';
import { ReportsModule } from '@reports/reports.module';
import { UsersModule } from '@users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { isProd } from '@config/constants';
import { join } from 'path';

import * as dotenv from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@utils/guards/jwt-auth.guard';
dotenv.config();

@Module({
  imports: [
    // Environment
    ConfigModule.forRoot({ envFilePath: `./src/config/environments/${process.env.NODE_ENV}.env`, isGlobal: true }),
    // Database
    TypeOrmModule.forRoot(
      !isProd
        ? {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [join(__dirname, '../**/**.entity{.ts,.js}')],
            synchronize: true, // esto solo es para desarrollo
            logging: true, // esto es para debugear
          }
        : {},
    ),
    UsersModule,
    ReportsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
