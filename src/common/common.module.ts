// src/common/common.module.ts
import { Module } from '@nestjs/common';
import { ContextService } from './services/context.service';

@Module({
  providers: [ContextService],
  exports: [ContextService],  // Exportar el servicio para usarlo en otros módulos
})
export class CommonModule {}
