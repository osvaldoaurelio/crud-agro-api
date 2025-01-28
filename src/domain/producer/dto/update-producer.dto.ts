import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { PropertyProducerDoc } from 'src/common/modules/swagger/docs/domain/producer/property-producer-doc';
import { trimString } from 'src/common/utils/strings';

export class UpdateProducerDto {
  @MaxLength(255)
  @MinLength(4)
  @IsString()
  @Transform(({ value }) => trimString(value))
  @ApiProperty(PropertyProducerDoc.fullName)
  fullName: string;
}
