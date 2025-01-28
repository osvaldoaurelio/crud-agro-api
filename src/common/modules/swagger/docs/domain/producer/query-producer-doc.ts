import { ApiQueryOptions } from '@nestjs/swagger';

export class QueryProducerDoc {
  static page: ApiQueryOptions = {
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number',
    example: 1,
  };

  static limit: ApiQueryOptions = {
    name: 'limit',
    type: Number,
    required: false,
    description: 'Limit of items per page',
    example: 10,
  };
}
