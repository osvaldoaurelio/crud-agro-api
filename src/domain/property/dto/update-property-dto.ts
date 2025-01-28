import { CreatePropertyDto } from './create-property-dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdatePropertyDto extends PartialType(
  OmitType(CreatePropertyDto, ['plantings'] as const),
) {}
