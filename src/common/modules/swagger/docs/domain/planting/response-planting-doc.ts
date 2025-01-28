import { ApiResponseOptions } from '@nestjs/swagger';
import { ResponsePlantingDto } from 'src/domain/planting/dto/response-planting.dto';

export class ResponsePlantingDoc {
  static findOne: ApiResponseOptions = {
    description: 'Returns the planting with the specified ID.',
    type: ResponsePlantingDto,
  };

  static remove: ApiResponseOptions = {
    description: 'The planting has been successfully deleted.',
  };
}
