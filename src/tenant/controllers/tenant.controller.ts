import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TenantService } from '../services/tenant.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async createTenant(@Body() createTenantDto: CreateTenantDto) {
    return await this.tenantService.create(createTenantDto);
  }

  @Get(':id')
  async getTenant(@Param('id') id: string) {
    return await this.tenantService.getTenantById(id);
  }

  @Get()
  async getAllTenants() {
    return await this.tenantService.getAllTenants();
  }
}
