import { ApiPropertyOptions } from '@nestjs/swagger';

export class PropertyBase {
  static id: ApiPropertyOptions = {
    example: 'cm6e78t5f0002356wdgnsd869',
    description: 'The unique identifier of the Property.',
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
