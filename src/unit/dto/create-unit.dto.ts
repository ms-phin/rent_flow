// import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

// export class CreateUnitDto {
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @IsString()
//   @IsOptional()
//   description?: string;

//   @IsString()
//   @IsOptional()
//   image?: string;

//   @IsString()
//   @IsNotEmpty()
//   propertyId: string;
// }

import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  name: string;

  @IsUUID()
  propertyId: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsNumber()
  bedrooms: number;

  @IsNumber()
  bathrooms: number;

  @IsOptional()
  @IsNumber()
  rent?: number;
}
