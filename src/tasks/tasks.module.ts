// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CommonModule } from '../common/common.module';  // Importa CommonModule

@Module({
  imports: [PrismaModule, CommonModule],  // Asegúrate de que CommonModule esté en imports
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
