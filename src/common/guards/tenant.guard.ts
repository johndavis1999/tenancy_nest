// src/common/guards/tenant.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Obtener el tenantId desde los headers o parámetros de la ruta
    const tenantId = request.headers['tenant-id'] || request.params['tenantId'];

    if (!tenantId) {
      throw new ForbiddenException('Tenant ID is missing');
    }

    // Aquí se pueden hacer más validaciones, como verificar si el tenant existe.
    // Si es válido, puede continuar la ejecución.
    request.tenantId = tenantId;  // Agregar tenantId al request para usarlo más tarde

    return true;
  }
}
