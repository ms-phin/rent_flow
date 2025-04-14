import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';

@Injectable()
export class UnitRepository {
  constructor(
    @InjectRepository(Unit)
    private repository: Repository<Unit>,
  ) {}

  async findAll(): Promise<Unit[]> {
    return this.repository.find({ relations: ['property', 'rentals'] });
  }

  async findOne(id: string): Promise<Unit | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['property', 'rentals'],
    });
  }

  async create(unit: Partial<Unit>): Promise<Unit> {
    const newUnit = this.repository.create(unit);
    return this.repository.save(newUnit);
  }

  async update(unit: Unit): Promise<Unit> {
    return this.repository.save(unit);
  }

  async remove(unit: Unit): Promise<Unit> {
    return this.repository.remove(unit);
  }
}
