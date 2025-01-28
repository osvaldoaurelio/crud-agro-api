import { ApiPropertyOptions } from '@nestjs/swagger';

export class PropertyBase {
  static id: ApiPropertyOptions = {
    example: 'cm6e78t5f0002356wdgnsd869',
    description: 'The unique identifier of the Resource.',
  };

  static createdAt: ApiPropertyOptions = {
    example: '2023-05-25T12:34:56.789Z',
    description: 'The date and time when the Resource was created.',
  };

  static updatedAt: ApiPropertyOptions = {
    example: '2023-05-25T12:34:56.789Z',
    description: 'The date and time when the Resource was last updated.',
  };
}
