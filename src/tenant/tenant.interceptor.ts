// src/common/interceptors/tenant.interceptor.ts
import { Injectable } from '@nestjs/common';
import { ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const tenantId = request.params.tenantId; // Obtener el `tenantId` de los parámetros de la URL
    if (tenantId) {
      request['tenantId'] = tenantId; // Almacenar el `tenantId` en la solicitud
    }
    return next.handle();
  }
}
