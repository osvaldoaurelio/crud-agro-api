import { ApiProperty } from '@nestjs/swagger';
import { State } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PropertyPropertyDoc } from 'src/common/modules/swagger/docs/domain/property/property-property-doc';
import { trimString } from 'src/common/utils/strings';
import { IsTotalAreaValid } from '../decorators/validators/is-total-area-valid.decorator';
import { CreatePlantingDto } from 'src/domain/planting/dto/create-planting.dto';

export class CreatePropertyDto {
  @MaxLength(255)
  @MinLength(4)
  @IsString()
  @Transform(({ value }) => trimString(value))
  @ApiProperty(PropertyPropertyDoc.propertyName)
  propertyName: string;

  @MaxLength(255)
  @IsString()
  @ApiProperty(PropertyPropertyDoc.city)
  city: string;

  @IsEnum(State)
  @ApiProperty(PropertyPropertyDoc.state)
  state: State;

  @IsTotalAreaValid()
  @Max(850000000)
  @Min(0)
  @IsNumber()
  @ApiProperty(PropertyPropertyDoc.totalArea)
  totalArea: number;

  @Min(0)
  @IsNumber()
  @ApiProperty(PropertyPropertyDoc.arableArea)
  arableArea: number;

  @Min(0)
  @IsNumber()
  @ApiProperty(PropertyPropertyDoc.vegetationArea)
  vegetationArea: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePlantingDto)
  @ApiProperty(PropertyPropertyDoc.createPlantings)
  plantings?: CreatePlantingDto[];
}
