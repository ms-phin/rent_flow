import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Property } from '../../property/entities/property.entity';
import { Rental } from '../../rental/entities/rental.entity';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Property, (property) => property.units)
  property: Property;

  @OneToMany(() => Rental, (rental) => rental.unit, { cascade: true })
  rentals: Rental[];
}
