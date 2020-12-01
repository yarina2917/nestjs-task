import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../task.entity';
import { TaskStatus } from '../models/task-status-enum';
import { GetTasksFilterDto } from '../models/get-tasks-filter.dto';
import { CreateTaskDto } from '../models/create-task.dto';
import { User } from '../../auth/user.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository) {
  }

  public getTasks (
    filterDto: GetTasksFilterDto,
    user: User
  ): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  public async getTaskById (id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, userId: user.id }});

    if (!found) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }

    return found;
  }

  public async createTask (createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  public async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }

  public async deleteTask(id: number, user: User) {
    const result = await this.taskRepository.delete({id, userId: user.id});

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }
  }

}
