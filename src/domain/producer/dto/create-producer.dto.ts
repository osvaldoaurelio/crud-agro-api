import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IsCpfOrCnpj } from 'src/common/decorators/validators/is-cpf-or-cnpj.decorator';
import { PropertyProducerDoc } from 'src/common/modules/swagger/docs/domain/producer/property-producer-doc';
import { removeNonNumeric, trimString } from 'src/common/utils/strings';
import { CreatePropertyDto } from 'src/domain/property/dto/create-property-dto';

export class CreateProducerDto {
  @MaxLength(255)
  @MinLength(4)
  @IsString()
  @Transform(({ value }) => trimString(value))
  @ApiProperty(PropertyProducerDoc.fullName)
  fullName: string;

  @IsCpfOrCnpj()
  @IsString()
  @Transform(({ value }) => removeNonNumeric(value))
  @ApiProperty(PropertyProducerDoc.cpfOrCnpj)
  cpfOrCnpj: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePropertyDto)
  @ApiProperty(PropertyProducerDoc.properties)
  properties?: CreatePropertyDto[];
}
