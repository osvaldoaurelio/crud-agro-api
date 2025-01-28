import { ApiPropertyOptions } from '@nestjs/swagger';
import { State } from '@prisma/client';
import { PropertyBase } from '../../property-base';
import { PropertyPlantingDoc } from '../planting/property-planting-doc';

export class PropertyPropertyDoc extends PropertyBase {
  static tagName = 'Property';

  static tagDescription = 'Property routes';

  static propertyName: ApiPropertyOptions = {
    example: 'Fazenda fazendeira',
    description: 'The name of the Property.',
  };

  static city: ApiPropertyOptions = {
    example: 'Anápolis',
    description: 'The city where the Property is located.',
  };

  static state: ApiPropertyOptions = {
    example: State.GO,
    description: 'The state where the Property is located.',
  };

  static totalArea: ApiPropertyOptions = {
    example: 3000,
    description: 'The total area of the Property.',
  };

  static arableArea: ApiPropertyOptions = {
    example: 2500,
    description: 'The arable area of the Property.',
  };

  static vegetationArea: ApiPropertyOptions = {
    example: 400,
    description: 'The vegetation area of the Property.',
  };

  static createPlantings: ApiPropertyOptions = {
    example: [
      {
        cropName: PropertyPlantingDoc.cropName.example,
        plantingDate: PropertyPlantingDoc.plantingDate.example,
      },
    ],
    description: 'The create plantings in the property',
  };

  static responsePlantings: ApiPropertyOptions = {
    example: [
      {
        id: PropertyBase.id.example,
        ...PropertyPropertyDoc.createPlantings.example[0],
        harvest: PropertyPlantingDoc.harvest.example,
        createdAt: PropertyBase.createdAt.example,
        updatedAt: PropertyBase.updatedAt.example,
      },
    ],
    description: 'The response plantings in the property',
  };

  static sumary: Record<string, ApiPropertyOptions> = {
    totalCountProperties: {
      example: 10,
      description: 'The total of properties',
    },
    totalAreaHectares: {
      example: 400000,
      description: 'The total area in hectares',
    },
    propertiesByState: {
      example: {
        SP: 10,
        GO: 20,
      },
      description: 'The total of properties by state',
    },
    propertiesByCrop: {
      example: {
        'soybean na Safra 2024': 10,
        'corn na Safra 2022': 20,
      },
      description: 'The total of properties by crop',
    },
    propertiesByLandUse: {
      example: {
        arableArea: 300000,
        vegetationArea: 100000,
      },
      description: 'The total of properties by land use',
    },
  };
}
