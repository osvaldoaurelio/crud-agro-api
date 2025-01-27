import { ApiPropertyOptions } from '@nestjs/swagger';
import { State } from '@prisma/client';

export class PropertyPropertyDoc {
  static tagName = 'Property';

  static tagDescription = 'Property routes';

  static id: ApiPropertyOptions = {
    example: 'cm6e78t5f0002356wdgnsd869',
    description: 'The unique identifier of the Property.',
  };

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

  static createdAt: ApiPropertyOptions = {
    example: '2023-05-25T12:34:56.789Z',
    description: 'The date and time when the Property was created.',
  };

  static updatedAt: ApiPropertyOptions = {
    example: '2023-05-25T12:34:56.789Z',
    description: 'The date and time when the Property was last updated.',
  };
}
