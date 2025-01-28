import { ApiPropertyOptions } from '@nestjs/swagger';
import { PropertyBase } from '../../property-base';

export class PropertyProducerDoc extends PropertyBase {
  static tagName = 'Producer';

  static tagDescription = 'Producer routes';

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
}
