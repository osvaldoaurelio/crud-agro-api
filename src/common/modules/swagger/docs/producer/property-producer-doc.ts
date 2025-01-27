import { ApiPropertyOptions } from '@nestjs/swagger';

export class PropertyProducerDoc {
  static tagName = 'Producer';

  static tagDescription = 'Producer routes';

  static id: ApiPropertyOptions = {
    example: 'cm6e78t5f0002356wdgnsd869',
    description: 'The unique identifier of the Producer.',
  };

  static fullName: ApiPropertyOptions = {
    example: 'John Doe',
    description: 'The full name of the Producer.',
  };

  static cpfOrCnpj: ApiPropertyOptions = {
    example: '123.456.789-00',
    description: 'The CPF or CNPJ of the Producer.',
  };

  static properties: ApiPropertyOptions = {
    example: [
      {
        propertyName: 'Fazenda fazendeira',
        city: 'Anápolis',
        state: 'GO',
        totalArea: 3000,
        arableArea: 2500,
        vegetationArea: 400,
      },
    ],
    description: 'The properties owned by the Producer.',
  };

  static createdAt: ApiPropertyOptions = {
    example: '2023-05-25T12:34:56.789Z',
    description: 'The date and time when the Producer was created.',
  };

  static updatedAt: ApiPropertyOptions = {
    example: '2023-05-25T12:34:56.789Z',
    description: 'The date and time when the Producer was last updated.',
  };
}
