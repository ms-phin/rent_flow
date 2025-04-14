import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { Rental } from './entities/rental.entity';
import { Unit } from '../unit/entities/unit.entity';
import { Tenant } from '../tenant/entities/tenant.entity';
import { UnitModule } from '../unit/unit.module';
import { TenantModule } from '../tenant/tenant.module';
import { AuthModule } from '../auth/auth.module';
import { RentalRepository } from './rental.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental, Unit, Tenant]),
    forwardRef(() => UnitModule), // Use forwardRef to break circular dependencies
    forwardRef(() => TenantModule), // Use forwardRef to break circular dependencies
    AuthModule,
  ],
  controllers: [RentalController],
  providers: [RentalService, RentalRepository], // Add RentalRepository here
  exports: [RentalService],
})
export class RentalModule {}
