import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthController } from './auth/controllers/auth.controller';
import { AuthService } from './auth/service/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule
  ]
})
export class AppModule {}
