import { ApiPropertyOptions } from '@nestjs/swagger';
import { State } from '@prisma/client';
import { PropertyBase } from '../../property-base';

export class PropertyPropertyDoc extends PropertyBase {
  static tagName = 'Property';

  static tagDescription = 'Property routes';

  static propertyName: ApiPropertyOptions = {
    example: 'Fazenda fazendeira',
    description: 'The name of the Property.',
  };

  static city: ApiPropertyOptions = {
    example: 'Anápolis',
    description: 'The city where the Property is located.',
  };

  static state: ApiPropertyOptions = {
    example: State.GO,
    description: 'The state where the Property is located.',
  };

  static totalArea: ApiPropertyOptions = {
    example: 3000,
    description: 'The total area of the Property.',
  };

  static arableArea: ApiPropertyOptions = {
    example: 2500,
    description: 'The arable area of the Property.',
  };

  static vegetationArea: ApiPropertyOptions = {
    example: 400,
    description: 'The vegetation area of the Property.',
  };
}
