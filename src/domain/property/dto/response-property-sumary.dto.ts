import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { PropertyPropertyDoc } from 'src/common/modules/swagger/docs/domain/property/property-property-doc';
import { transformArrayToObject } from 'src/common/utils/transformers';

@Exclude()
export class ResponsePropertySumaryDto {
  @Expose()
  @IsNumber()
  @ApiProperty(PropertyPropertyDoc.sumary.totalCountProperties)
  totalCountProperties: number;

  @Expose()
  @IsNumber()
  @Transform(({ value }) => value._sum.totalArea)
  @ApiProperty(PropertyPropertyDoc.sumary.totalAreaHectares)
  totalAreaHectares: number;

  @Expose()
  @Transform(({ value }) => transformArrayToObject(value, 'state'))
  @ApiProperty(PropertyPropertyDoc.sumary.propertiesByState)
  propertiesByState: object;

  @Expose()
  @Transform(({ value }) =>
    value.map(({ cropName, harvest, _count }) => ({
      cropPlanted: `${cropName} na Safra ${harvest}`,
      _count,
    })),
  )
  @Transform(({ value }) => transformArrayToObject(value, 'cropPlanted'))
  @ApiProperty(PropertyPropertyDoc.sumary.propertiesByCrop)
  propertiesByCrop: object;

  @Expose()
  @Transform(({ value }) => value._sum)
  @ApiProperty(PropertyPropertyDoc.sumary.propertiesByLandUse)
  propertiesByLandUse: object;
}
