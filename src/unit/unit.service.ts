import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Property } from '../property/entities/property.entity';
import { UnitRepository } from './unit.repository';

@Injectable()
export class UnitService {
  constructor(
    private unitRepository: UnitRepository,
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    const { propertyId, ...unitData } = createUnitDto;
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
    });
    if (!property) {
      throw new NotFoundException(`Property with ID ${propertyId} not found`);
    }
    return this.unitRepository.create({
      ...unitData,
      propertyId,
    });
  }

  async findAll(): Promise<Unit[]> {
    return this.unitRepository.findAll();
  }

  async findOne(id: string): Promise<Unit> {
    const unit = await this.unitRepository.findOne(id);
    if (!unit) {
      throw new NotFoundException(`Unit with ID ${id} not found`);
    }
    return unit;
  }

  async update(id: string, updateUnitDto: UpdateUnitDto): Promise<Unit> {
    const unit = await this.findOne(id);

    // If propertyId is provided, verify that the property exists
    if (updateUnitDto.propertyId) {
      const property = await this.propertyRepository.findOne({
        where: { id: updateUnitDto.propertyId },
      });

      if (!property) {
        throw new NotFoundException(
          `Property with ID ${updateUnitDto.propertyId} not found`,
        );
      }
    }

    // Update the unit with the provided data
    Object.assign(unit, updateUnitDto);

    return this.unitRepository.update(unit);
  }

  async remove(id: string): Promise<void> {
    const unit = await this.findOne(id);
    await this.unitRepository.remove(unit);
  }
}
