import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Unit } from '../../unit/entities/unit.entity';
import { Tenant } from '../../tenant/entities/tenant.entity';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Unit, (unit) => unit.rentals)
  unit: Unit;

  @ManyToOne(() => Tenant)
  tenant: Tenant;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  status: 'upcoming' | 'active' | 'completed';

  @Column({ nullable: true })
  notes: string;
}
