import { ApiOperationOptions } from '@nestjs/swagger';

export class OperationPlantingDoc {
  static findOne: ApiOperationOptions = {
    summary: 'Get a planting by ID',
  };

  static update: ApiOperationOptions = {
    summary: 'Update a planting by ID',
  };

  static remove: ApiOperationOptions = {
    summary: 'Delete a planting by ID',
  };
}
