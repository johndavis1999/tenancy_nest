// src/common/middleware/tenant.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.params.tenantId; // Captura el `tenantId` desde la URL
    if (!tenantId) {
      return res.status(400).json({ message: 'Tenant ID is required' });
    }
    req['tenantId'] = tenantId; // Lo almacena en el objeto Request
    next();
  }
}
