import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './entities/rental.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Unit } from '../unit/entities/unit.entity';
import { Tenant } from '../tenant/entities/tenant.entity';
import { RentalRepository } from './rental.repository';

@Injectable()
export class RentalService {
  constructor(
    private rentalRepository: RentalRepository,
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
  ) {}

  async create(createRentalDto: CreateRentalDto): Promise<Rental> {
    const { unitId, tenantId, startDate, endDate, ...rentalData } =
      createRentalDto;

    const unit = await this.unitRepository.findOne({ where: { id: unitId } });
    if (!unit) {
      throw new NotFoundException(`Unit with ID ${unitId} not found`);
    }

    const tenant = await this.tenantRepository.findOne({
      where: { id: tenantId },
    });
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${tenantId} not found`);
    }

    // Convert string dates to Date objects
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;

    return this.rentalRepository.create({
      ...rentalData,
      startDate: startDateObj,
      endDate: endDateObj,
      unit,
      tenant,
    });
  }

  async findAll(): Promise<Rental[]> {
    return this.rentalRepository.findAll();
  }

  async findOne(id: string): Promise<Rental> {
    const rental = await this.rentalRepository.findOne(id);
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }
    return rental;
  }

  async update(id: string, updateRentalDto: UpdateRentalDto): Promise<Rental> {
    const rental = await this.findOne(id);

    // Convert dates if they exist in the update DTO
    if (updateRentalDto.startDate) {
      updateRentalDto.startDate = new Date(updateRentalDto.startDate);
    }

    if (updateRentalDto.endDate) {
      updateRentalDto.endDate = new Date(updateRentalDto.endDate);
    }

    Object.assign(rental, updateRentalDto);
    return this.rentalRepository.update(rental);
  }

  async remove(id: string): Promise<void> {
    const rental = await this.findOne(id);
    await this.rentalRepository.remove(rental);
  }
}
