import { ApiOperationOptions } from '@nestjs/swagger';

export class OperationProducerDoc {
  static create: ApiOperationOptions = {
    summary: 'Create a new producer',
  };

  static findAll: ApiOperationOptions = {
    summary: 'Get all producers',
  };

  static findOne: ApiOperationOptions = {
    summary: 'Get a producer by ID',
  };

  static update: ApiOperationOptions = {
    summary: 'Update a producer by ID',
  };

  static addPropertyToProducer: ApiOperationOptions = {
    summary: 'Add properties to a producer',
  };

  static remove: ApiOperationOptions = {
    summary: 'Delete a producer by ID',
  };
}
