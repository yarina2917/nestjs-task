import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
