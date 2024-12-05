// script_migracion_tenants.js

const { PrismaClient } = require('@prisma/client');
const { exec } = require('child_process');
const tenants = ['tenant_desarrollo', 'tenancy_foo']; // Lista de bases de datos de tenants

async function runMigrationsForTenant(tenantDbName) {
  const prismaUrl = `mysql://root:@localhost:3306/${tenantDbName}`;
  
  // Establecer la variable de entorno DATABASE_URL para Prisma
  process.env.DATABASE_URL = prismaUrl;

  // Configurar Prisma para usar una base de datos dinámica
  const prismaClient = new PrismaClient();

  // Ejecutar las migraciones para este tenant
  try {
    console.log(`Ejecutando migración para el tenant ${tenantDbName}...`);

    // Conectar para asegurarse de que funcione
    await prismaClient.$executeRaw`SELECT 1`; 

    // Ejecutar migraciones usando Prisma CLI
    exec(`npx prisma migrate deploy --schema=prisma/schema.prisma`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error al ejecutar migraciones para ${tenantDbName}: ${stderr}`);
        return;
      }
      console.log(`Migración exitosa para ${tenantDbName}: ${stdout}`);
    });
  } catch (error) {
    console.error(`No se pudo conectar a la base de datos del tenant ${tenantDbName}:`, error);
  } finally {
    await prismaClient.$disconnect(); // Desconectar el cliente de Prisma
  }
}

// Ejecutar migraciones para todos los tenants
async function runMigrations() {
  for (const tenant of tenants) {
    await runMigrationsForTenant(tenant);
  }
}

runMigrations().catch((err) => console.error('Error al ejecutar migraciones:', err));
