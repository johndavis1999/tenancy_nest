// src/common/services/context.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContextService {
  private tenantId: string;

  setTenantId(tenantId: string) {
    this.tenantId = tenantId;
  }

  getTenantId(): string {
    return this.tenantId;
  }
}
