// src/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private prismaClients: Map<string, PrismaClient> = new Map();

  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'], // Opcional: Log de operaciones de Prisma
    });
  }

  // Método para conectar con la base de datos del tenant
  async getTenantPrismaClient(tenantId: string): Promise<PrismaClient> {
    // Buscar el tenant para obtener su nombre de base de datos
    const tenant = await this.tenant.findUnique({
      where: { id: tenantId },
      select: { data: true }, // Obtener todo el campo `data` que contiene el JSON
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${tenantId} not found`);
    }

    // Realizar el casting de `tenant.data` a un objeto con la propiedad `tenancy_db_name`
    const tenantData = tenant.data as { tenancy_db_name: string };

    // Acceder al campo `tenancy_db_name` dentro de `data`
    const tenancyDbName = tenantData?.tenancy_db_name;
    
    if (!tenancyDbName) {
      throw new NotFoundException(`Database name not found for tenant ${tenantId}`);
    }

    const databaseUrl = `mysql://root:@localhost:3306/${tenancyDbName}`;

    // Verificar si ya existe una conexión para este tenant
    if (!this.prismaClients.has(databaseUrl)) {
      const tenantPrismaClient = new PrismaClient({
        datasources: { db: { url: databaseUrl } },
      });
      await tenantPrismaClient.$connect();
      this.prismaClients.set(databaseUrl, tenantPrismaClient);
      console.log(`Conexión a la base de datos del tenant ${tenantId} establecida.`);
    }

    return this.prismaClients.get(databaseUrl);
  }

  // Inicializa Prisma para la base de datos principal
  async onModuleInit() {
    await this.$connect();
    console.log('Prisma conectado a la base de datos principal');
  }

  // Desconectar Prisma cuando el módulo se destruye
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Prisma desconectado de la base de datos principal');
  }
}
