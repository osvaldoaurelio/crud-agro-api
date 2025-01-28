import { ApiPropertyOptions } from '@nestjs/swagger';
import { PropertyBase } from '../../property-base';

export class PropertyPlantingDoc extends PropertyBase {
  static tagName = 'Planting';

  static tagDescription = 'Planting routes';

  static cropName: ApiPropertyOptions = {
    example: 'corn',
    description: 'The name of the crop',
  };

  static harvest: ApiPropertyOptions = {
    example: 2024,
    description: 'The year of the harvest',
  };

  static plantingDate: ApiPropertyOptions = {
    example: '2023-05-25T12:34:56.789Z',
    description: 'The date and time when the crop was planted',
  };
}
