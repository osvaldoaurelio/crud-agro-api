import { ApiProperty } from '@nestjs/swagger';
import { Producer } from '@prisma/client';
import { Exclude, Expose, plainToInstance, Transform } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import { PropertyProducerDoc } from 'src/common/modules/swagger/docs/domain/producer/property-producer-doc';
import { formatCpfOrCnpj } from 'src/common/utils/formatters';
import { ResponsePropertyDto } from 'src/domain/property/dto/response-property.dto';

@Exclude()
export class ResponseProducerDto implements Producer {
  @Expose()
  @IsString()
  @ApiProperty(PropertyProducerDoc.id)
  id: string;

  @Expose()
  @IsString()
  @ApiProperty(PropertyProducerDoc.fullName)
  fullName: string;

  @Expose()
  @IsString()
  @Transform(({ value }) => formatCpfOrCnpj(value))
  @ApiProperty(PropertyProducerDoc.cpfOrCnpj)
  cpfOrCnpj: string;

  @Expose()
  @IsArray()
  @Transform(({ value }) => plainToInstance(ResponsePropertyDto, value))
  @ApiProperty(PropertyProducerDoc.responseProperties)
  properties: ResponsePropertyDto[];

  @Expose()
  @IsString()
  @ApiProperty(PropertyProducerDoc.createdAt)
  createdAt: Date;

  @Expose()
  @IsString()
  @ApiProperty(PropertyProducerDoc.updatedAt)
  updatedAt: Date;
}
