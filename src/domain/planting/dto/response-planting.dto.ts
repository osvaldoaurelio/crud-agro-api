import { ApiProperty } from '@nestjs/swagger';
import { Planting } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { PropertyPlantingDoc } from 'src/common/modules/swagger/docs/domain/planting/property-planting-doc';

@Exclude()
export class ResponsePlantingDto implements Planting {
  @Expose()
  @IsString()
  @ApiProperty(PropertyPlantingDoc.id)
  id: string;

  @Expose()
  @IsString()
  @ApiProperty(PropertyPlantingDoc.cropName)
  cropName: string;

  @Expose()
  @IsNumber()
  @ApiProperty(PropertyPlantingDoc.harvest)
  harvest: number;

  @Expose()
  @IsArray()
  @ApiProperty(PropertyPlantingDoc.plantingDate)
  plantingDate: Date;

  @Exclude()
  propertyId: string;

  @Expose()
  @IsString()
  @ApiProperty(PropertyPlantingDoc.createdAt)
  createdAt: Date;

  @Expose()
  @IsString()
  @ApiProperty(PropertyPlantingDoc.updatedAt)
  updatedAt: Date;
}
