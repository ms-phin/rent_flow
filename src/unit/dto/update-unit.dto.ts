import { PartialType } from '@nestjs/mapped-types';
import { CreateUnitDto } from './create-unit.dto';
import { IsOptional, IsString, IsNumber, IsUUID } from 'class-validator';

export class UpdateUnitDto extends PartialType(CreateUnitDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsNumber()
  bedrooms?: number;

  @IsOptional()
  @IsNumber()
  bathrooms?: number;

  @IsOptional()
  @IsNumber()
  rent?: number;

  @IsOptional()
  @IsUUID()
  propertyId?: string;
}
