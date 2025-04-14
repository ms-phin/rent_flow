import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class TenantRepository extends Repository<Tenant> {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {
    super(
      tenantRepository.target,
      tenantRepository.manager,
      tenantRepository.queryRunner,
    );
  }

  async findByEmail(email: string): Promise<Tenant | null> {
    return this.findOne({ where: { email } });
  }
}
