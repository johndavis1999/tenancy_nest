// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContextService } from '../common/services/context.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly contextService: ContextService
  ) {}

  async getTasks() {
    const tenantId = this.contextService.getTenantId();  // Obtiene el tenantId automáticamente
    const prisma = await this.prismaService.getTenantPrismaClient(tenantId);
    return prisma.task.findMany();
  }

  async createTask(createTaskDto: any) {
    const tenantId = this.contextService.getTenantId();  // Obtiene el tenantId automáticamente
    const prisma = await this.prismaService.getTenantPrismaClient(tenantId);
    return prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
      },
    });
  }
}
