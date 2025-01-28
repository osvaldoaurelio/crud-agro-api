import { ApiResponseOptions } from '@nestjs/swagger';
import { ResponsePropertyDto } from 'src/domain/property/dto/response-property.dto';

export class ResponsePropertyDoc {
  static findOne: ApiResponseOptions = {
    description: 'Returns the property with the specified ID.',
    type: ResponsePropertyDto,
  };

  static update: ApiResponseOptions = {
    description: 'The property has been successfully updated.',
    type: ResponsePropertyDto,
  };

  static addPlantingToProperty: ApiResponseOptions = {
    description: 'Return the property with planting added',
    type: ResponsePropertyDto,
  };

  static remove: ApiResponseOptions = {
    description: 'The property has been successfully deleted.',
  };
}
