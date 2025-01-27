import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Property } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { PropertyPropertyDoc } from 'src/common/modules/swagger/docs/property/property-property-doc';

@Exclude()
export class ResponsePropertyDto implements Property {
  @Expose()
  @IsString()
  @ApiProperty(PropertyPropertyDoc.id)
  id: string;

  @Expose()
  @IsString()
  @ApiProperty(PropertyPropertyDoc.propertyName)
  propertyName: string;

  @Expose()
  @IsString()
  @ApiProperty(PropertyPropertyDoc.city)
  city: string;

  @Expose()
  @IsString()
  @ApiProperty(PropertyPropertyDoc.state)
  state: $Enums.State;

  @Expose()
  @IsNumber()
  @ApiProperty(PropertyPropertyDoc.totalArea)
  totalArea: number;

  @Expose()
  @IsNumber()
  @ApiProperty(PropertyPropertyDoc.arableArea)
  arableArea: number;

  @Expose()
  @IsNumber()
  @ApiProperty(PropertyPropertyDoc.vegetationArea)
  vegetationArea: number;

  @Exclude()
  producerId: string;

  @Expose()
  @IsString()
  @ApiProperty(PropertyPropertyDoc.createdAt)
  createdAt: Date;

  @Expose()
  @IsString()
  @ApiProperty(PropertyPropertyDoc.updatedAt)
  updatedAt: Date;
}
