import {
  Body,
  Controller,
  Patch,
  Post,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from '../service/tasks.service';

import { CreateTaskDto } from '../models/create-task.dto';
import { TaskStatus } from '../models/task-status-enum';
import { GetTasksFilterDto } from '../models/get-tasks-filter.dto';

import { TaskStatusValidationPipe } from '../pipes/task-status-validation.pipe';
import { Task } from '../task.entity';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User
  ) {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
