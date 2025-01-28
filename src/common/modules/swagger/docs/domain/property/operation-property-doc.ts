import { ApiOperationOptions } from '@nestjs/swagger';

export class OperationPropertyDoc {
  static findOne: ApiOperationOptions = {
    summary: 'Get a property by ID',
  };

  static update: ApiOperationOptions = {
    summary: 'Update a property by ID',
  };

  static addPlantingToProperty: ApiOperationOptions = {
    summary: 'Add planting to a property',
  };

  static remove: ApiOperationOptions = {
    summary: 'Delete a property by ID',
  };
}
