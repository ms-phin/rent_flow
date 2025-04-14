// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   OneToMany,
// } from 'typeorm';
// import { Property } from '../../property/entities/property.entity';
// import { Rental } from '../../rental/entities/rental.entity';

// @Entity()
// export class Unit {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @Column({ nullable: true })
//   description: string;

//   @Column({ nullable: true })
//   image: string;

//   @ManyToOne(() => Property, (property) => property.units)
//   property: Property;

//   @OneToMany(() => Rental, (rental) => rental.unit, { cascade: true })
//   rentals: Rental[];
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Property } from '../../property/entities/property.entity';
import { Rental } from '../../rental/entities/rental.entity';

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'int', nullable: true })
  size: number;

  @Column({ type: 'int', default: 1 })
  bedrooms: number;

  @Column({ type: 'int', default: 1 })
  bathrooms: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  rent: number;

  @Column({ type: 'uuid' })
  propertyId: string;

  @ManyToOne(() => Property, (property) => property.units, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @OneToMany(() => Rental, (rental) => rental.unit)
  rentals: Rental[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
