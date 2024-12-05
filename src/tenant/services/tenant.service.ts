import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';

@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTenantDto: CreateTenantDto) {
    // Aquí usamos el `nombre` como `id`
    const { nombre, estado, tenancy_db_name } = createTenantDto;

    // Crear el tenant
    const tenant = await this.prisma.tenant.create({
      data: {
        id: nombre,  // Usamos `nombre` como el ID
        data: {
          nombre,
          estado,
          tenancy_db_name,
        },
      },
    });

    // Crear la base de datos asociada al tenant
    await this.createTenantDatabase(tenancy_db_name);

    return tenant;
  }

  // Obtener un tenant por su ID
  async getTenantById(id: string) {
    return await this.prisma.tenant.findUnique({
      where: { id },
    });
  }

  // Obtener todos los tenants
  async getAllTenants() {
    return await this.prisma.tenant.findMany();
  }

  // Crear la base de datos para un tenant
  private async createTenantDatabase(databaseName: string) {
    // Este método debe ejecutar un comando SQL para crear la base de datos del tenant
    const query = `CREATE DATABASE \`${databaseName}\`;`;
    await this.prisma.$executeRawUnsafe(query);
    console.log(`Base de datos '${databaseName}' creada exitosamente.`);
  }
}
