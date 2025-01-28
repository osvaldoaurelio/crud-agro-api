import { ApiPropertyOptions } from '@nestjs/swagger';
import { PropertyBase } from '../../property-base';
import { ResponsePropertyDto } from 'src/domain/property/dto/response-property.dto';
import { PropertyPropertyDoc } from '../property/property-property-doc';
import { PropertyPlantingDoc } from '../planting/property-planting-doc';

export class PropertyProducerDoc extends PropertyBase {
  static tagName = 'Producer';

  static tagDescription = 'Producer routes';

  static fullName: ApiPropertyOptions = {
    example: 'John Doe 3',
    description: 'The full name of the Producer.',
  };

  static cpfOrCnpj: ApiPropertyOptions = {
    example: '123.456.789-00',
    description: 'The CPF or CNPJ of the Producer.',
  };

  static createProperties: ApiPropertyOptions = {
    example: [
      {
        propertyName: PropertyPropertyDoc.propertyName.example,
        city: PropertyPropertyDoc.city.example,
        state: PropertyPropertyDoc.state.example,
        totalArea: PropertyPropertyDoc.totalArea.example,
        arableArea: PropertyPropertyDoc.arableArea.example,
        vegetationArea: PropertyPropertyDoc.vegetationArea.example,
        plantings: [
          {
            cropName: PropertyPlantingDoc.cropName.example,
            plantingDate: PropertyPlantingDoc.plantingDate.example,
          },
        ],
      },
    ],
    description: 'The create properties owned by the Producer.',
    type: ResponsePropertyDto,
  };

  static responseProperties: ApiPropertyOptions = {
    example: [
      {
        id: PropertyBase.id.example,
        ...PropertyProducerDoc.createProperties.example[0],
        plantings: [
          {
            id: PropertyBase.id.example,
            ...PropertyProducerDoc.createProperties.example[0].plantings[0],
            harvest: PropertyPlantingDoc.harvest.example,
            createdAt: PropertyBase.createdAt.example,
            updatedAt: PropertyBase.updatedAt.example,
          },
        ],
        createdAt: PropertyBase.createdAt.example,
        updatedAt: PropertyBase.updatedAt.example,
      },
    ],
    description: 'The response properties owned by the Producer.',
  };
}
