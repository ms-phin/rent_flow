import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { Unit } from './entities/unit.entity';
import { Property } from '../property/entities/property.entity';
import { AuthModule } from '../auth/auth.module';
import { UnitRepository } from './unit.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Unit, Property]), AuthModule],
  controllers: [UnitController],
  providers: [UnitService, UnitRepository], // Add UnitRepository here
  exports: [UnitService],
})
export class UnitModule {}
