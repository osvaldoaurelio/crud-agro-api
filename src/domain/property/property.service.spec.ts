import { Test, TestingModule } from '@nestjs/testing';
import { PropertyService } from './property.service';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { UpdatePropertyDto } from './dto/update-property-dto';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ResponsePropertyDto } from './dto/response-property.dto';
import { ResponsePropertySumaryDto } from './dto/response-property-sumary.dto';

describe('PropertyService', () => {
  let service: PropertyService;

  const mockPrismaService = {
    property: {
      findUnique: jest.fn(),
      count: jest.fn(),
      aggregate: jest.fn(),
      groupBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    planting: {
      createMany: jest.fn(),
      groupBy: jest.fn(),
    },
  };

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = testingModule.get<PropertyService>(PropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a property', async () => {
      const property = {
        id: '1',
        propertyName: 'Property 1',
        city: 'City 1',
        state: 'SP',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 30,
        plantings: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.property.findUnique.mockResolvedValue(property);

      expect(await service.findOne('1')).toEqual(
        plainToInstance(ResponsePropertyDto, property),
      );
    });

    it('should throw NotFoundException if property not found', async () => {
      mockPrismaService.property.findUnique.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getSumary', () => {
    it('should return a summary of properties', async () => {
      const totalCountProperties = 10;
      const totalAreaHectares = { _sum: { totalArea: 1000 } };
      const propertiesByState = [{ state: 'SP', _count: 5 }];
      const propertiesByCrop = [
        { cropName: 'Wheat', harvest: 2022, _count: 3 },
      ];
      const propertiesByLandUse = {
        _sum: { arableArea: 500, vegetationArea: 300 },
      };

      mockPrismaService.property.count.mockResolvedValue(totalCountProperties);
      mockPrismaService.property.aggregate.mockResolvedValueOnce(
        totalAreaHectares,
      );
      mockPrismaService.property.groupBy.mockResolvedValueOnce(
        propertiesByState,
      );
      mockPrismaService.planting.groupBy.mockResolvedValueOnce(
        propertiesByCrop,
      );
      mockPrismaService.property.aggregate.mockResolvedValueOnce(
        propertiesByLandUse,
      );

      expect(await service.getSumary()).toEqual(
        plainToInstance(ResponsePropertySumaryDto, {
          totalCountProperties,
          totalAreaHectares,
          propertiesByState,
          propertiesByCrop,
          propertiesByLandUse,
        }),
      );
    });
  });

  describe('update', () => {
    it('should update a property', async () => {
      const updatePropertyDto: UpdatePropertyDto = {
        propertyName: 'Updated Name',
      };
      const property = {
        id: '1',
        propertyName: 'Property 1',
        city: 'City 1',
        state: 'SP',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 30,
        plantings: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedProperty = { ...property, ...updatePropertyDto };

      mockPrismaService.property.findUnique.mockResolvedValue(property);
      mockPrismaService.property.update.mockResolvedValue(updatedProperty);

      expect(await service.update('1', updatePropertyDto)).toEqual(
        plainToInstance(ResponsePropertyDto, updatedProperty),
      );
      expect(mockPrismaService.property.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updatePropertyDto,
      });
    });
  });

  describe('addPlantingToProperty', () => {
    it('should add plantings to a property', async () => {
      const plantings = [
        {
          plantingDate: new Date(),
          cropName: 'Wheat',
        },
      ];
      const property = {
        id: '1',
        propertyName: 'Property 1',
        city: 'City 1',
        state: 'SP',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 30,
        plantings,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.property.findUnique.mockResolvedValue(property);
      mockPrismaService.planting.createMany.mockResolvedValue({
        count: plantings.length,
      });

      expect(await service.addPlantingToProperty('1', plantings)).toEqual(
        plainToInstance(ResponsePropertyDto, property),
      );
    });
  });

  describe('remove', () => {
    it('should remove a property', async () => {
      const property = {
        id: '1',
        propertyName: 'Property 1',
        city: 'City 1',
        state: 'SP',
        totalArea: 100,
        arableArea: 50,
        vegetationArea: 30,
        plantings: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.property.findUnique.mockResolvedValue(property);

      await service.remove('1');
      expect(mockPrismaService.property.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
