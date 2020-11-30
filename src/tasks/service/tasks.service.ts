import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../task.entity';
import { TaskStatus } from '../models/task-status-enum';
import { GetTasksFilterDto } from '../models/get-tasks-filter.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository) {
  }

  public getTasks (filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  public async getTaskById (id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }

    return found;
  }

  public async createTask (createTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  public async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  public async deleteTask(id: number) {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} was not found`);
    }
  }

}
