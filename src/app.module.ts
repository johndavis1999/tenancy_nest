import { Module } from '@nestjs/common';
import { TenantModule } from './tenant/tenant.module';
import { PrismaService } from './prisma/prisma.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TenantModule, TasksModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
