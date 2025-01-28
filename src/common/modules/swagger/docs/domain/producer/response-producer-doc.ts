import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';
import { ResponseProducerDto } from 'src/domain/producer/dto/response-producer.dto';
import { PaginatedBase } from '../../paginated-base';

class PaginatedResponseProducerDto extends PaginatedBase {
  @ApiProperty({
    description: 'An array of producers.',
    isArray: true,
    type: ResponseProducerDto,
  })
  data: ResponseProducerDto[];
}

export class ResponseProducerDoc {
  static create: ApiResponseOptions = {
    description: 'The producer has been successfully created.',
    type: ResponseProducerDto,
  };

  static findAll: ApiResponseOptions = {
    description: 'Returns an array of producers with pagination.',
    type: PaginatedResponseProducerDto,
  };

  static findOne: ApiResponseOptions = {
    description: 'Returns the producer with the specified ID.',
    type: ResponseProducerDto,
  };

  static update: ApiResponseOptions = {
    description: 'The producer has been successfully updated.',
    type: ResponseProducerDto,
  };

  static addPropertyToProducer: ApiResponseOptions = {
    description: 'Returns the producer with property added.',
    type: ResponseProducerDto,
  };

  static remove: ApiResponseOptions = {
    description: 'The producer has been successfully deleted.',
  };
}
