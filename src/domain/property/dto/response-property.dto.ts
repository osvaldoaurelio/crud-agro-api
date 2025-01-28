import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Property } from '@prisma/client';
import { Exclude, Expose, plainToInstance, Transform } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { PropertyPropertyDoc } from 'src/common/modules/swagger/docs/domain/property/property-property-doc';
import { ResponsePlantingDto } from 'src/domain/planting/dto/response-planting.dto';

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
  @IsArray()
  @Transform(({ value }) => plainToInstance(ResponsePlantingDto, value))
  @ApiProperty(PropertyPropertyDoc.responsePlantings)
  plantings: ResponsePlantingDto[];

  @Expose()
  @IsString()
  @ApiProperty(PropertyPropertyDoc.createdAt)
  createdAt: Date;

  @Expose()
  @IsString()
  @ApiProperty(PropertyPropertyDoc.updatedAt)
  updatedAt: Date;
}
