// src/tasks/tasks.controller.ts
import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ContextService } from '../common/services/context.service';

@Controller(':tenantId/tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly contextService: ContextService
  ) {}

  @Get()
  async getTasks(@Request() req) {
    const tenantId = req.params.tenantId;
    this.contextService.setTenantId(tenantId); // Almacenar tenantId en el ContextService
    return this.tasksService.getTasks();
  }

  @Post()
  async createTask(@Body() createTaskDto: any, @Request() req) {
    const tenantId = req.params.tenantId;
    this.contextService.setTenantId(tenantId); // Almacenar tenantId en el ContextService
    return this.tasksService.createTask(createTaskDto);
  }
}
