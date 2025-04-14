import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './entities/rental.entity';

@Injectable()
export class RentalRepository {
  constructor(
    @InjectRepository(Rental)
    private repository: Repository<Rental>,
  ) {}

  async findAll(): Promise<Rental[]> {
    return this.repository.find({ relations: ['unit', 'tenant'] });
  }

  async findOne(id: string): Promise<Rental | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['unit', 'tenant'],
    });
  }

  async create(rental: Partial<Rental>): Promise<Rental> {
    const newRental = this.repository.create(rental);
    return this.repository.save(newRental);
  }

  async update(rental: Rental): Promise<Rental> {
    return this.repository.save(rental);
  }

  async remove(rental: Rental): Promise<Rental> {
    return this.repository.remove(rental);
  }
}
