import { Module } from '@nestjs/common';
import { TenantController } from './controllers/tenant.controller';
import { TenantService } from './services/tenant.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TenantController], // Controladores del módulo
  providers: [TenantService, PrismaService], // Servicios disponibles dentro del módulo
  exports: [TenantService], // Exporta TenantService para ser usado en otros módulos si es necesario
})
export class TenantModule {}
