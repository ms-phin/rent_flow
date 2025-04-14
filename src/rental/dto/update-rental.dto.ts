import { PartialType } from '@nestjs/mapped-types';
import { CreateRentalDto } from './create-rental.dto';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRentalDto {
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  @IsOptional()
  @IsEnum(['upcoming', 'active', 'completed'])
  status?: 'upcoming' | 'active' | 'completed';

  @IsOptional()
  @IsString()
  notes?: string;
}
