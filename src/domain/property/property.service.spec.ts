import { Test, TestingModule } from '@nestjs/testing';
import { PropertyService } from './property.service';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { UpdatePropertyDto } from './dto/update-property-dto';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ResponsePropertyDto } from './dto/response-property.dto';
import { ResponsePropertySumaryDto } from './dto/response-property-sumary.dto';

describe('PropertyService', () => {
  let propertyService: PropertyService;

  const mockProperty = {
    id: 'cvk4',
    propertyName: 'Property Name',
    // other fields...
  };

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

    propertyService = testingModule.get<PropertyService>(PropertyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return a property if it exists', async () => {
      const expectedResponse = plainToInstance(
        ResponsePropertyDto,
        mockProperty,
      );

      mockPrismaService.property.findUnique.mockResolvedValue(mockProperty);
      const response = await propertyService.findOne(mockProperty.id);

      expect(response).toStrictEqual(expectedResponse);
      expect(mockPrismaService.property.findUnique).toHaveBeenCalledWith({
        where: { id: mockProperty.id },
        include: { plantings: true },
      });
    });

    it('should throw NotFoundException if property not found', async () => {
      mockPrismaService.property.findUnique.mockResolvedValue(null);

      await expect(propertyService.findOne(mockProperty.id)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.property.findUnique).toHaveBeenCalledWith({
        where: { id: mockProperty.id },
        include: { plantings: true },
      });
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
      const expectedResponse = plainToInstance(ResponsePropertySumaryDto, {
        totalCountProperties,
        totalAreaHectares,
        propertiesByState,
        propertiesByCrop,
        propertiesByLandUse,
      });

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

      expect(await propertyService.getSumary()).toStrictEqual(expectedResponse);
    });
  });

  describe('update', () => {
    it('should update a property if it exists', async () => {
      const mockUpdateProperty: UpdatePropertyDto = {
        propertyName: 'Updated Name',
      };
      const expectedResponse = plainToInstance(ResponsePropertyDto, {
        ...mockProperty,
        ...mockUpdateProperty,
      });

      mockPrismaService.property.findUnique.mockResolvedValue(mockProperty);
      mockPrismaService.property.update.mockResolvedValue({
        ...mockProperty,
        ...mockUpdateProperty,
      });
      const response = await propertyService.update(
        mockProperty.id,
        mockUpdateProperty,
      );

      expect(response).toStrictEqual(expectedResponse);
      expect(mockPrismaService.property.findUnique).toHaveBeenCalledWith({
        where: { id: mockProperty.id },
        include: {},
      });
      expect(mockPrismaService.property.update).toHaveBeenCalledWith({
        where: { id: mockProperty.id },
        data: mockUpdateProperty,
      });
    });

    it('should throw NotFoundException if property not found', async () => {
      mockPrismaService.property.findUnique.mockResolvedValue(null);

      await expect(
        propertyService.update(mockProperty.id, {} as UpdatePropertyDto),
      ).rejects.toThrow(NotFoundException);
      expect(mockPrismaService.property.findUnique).toHaveBeenCalledWith({
        where: { id: mockProperty.id },
        include: {},
      });
      expect(mockPrismaService.property.update).not.toHaveBeenCalled();
    });
  });

  describe('addPlantingToProperty', () => {
    const mockPlantings = [
      { plantingDate: new Date(), cropName: 'Corn' },
      { plantingDate: new Date(), cropName: 'Soy' },
    ];

    it('should add plantings to a property if it exists', async () => {
      const mockPropertyWithPlantings = {
        ...mockProperty,
        plantings: mockPlantings,
      };
      const expectedResponse = plainToInstance(
        ResponsePropertyDto,
        mockPropertyWithPlantings,
      );

      mockPrismaService.property.findUnique.mockResolvedValue(
        mockPropertyWithPlantings,
      );
      mockPrismaService.planting.createMany.mockResolvedValue(undefined);
      const response = await propertyService.addPlantingToProperty(
        mockProperty.id,
        mockPlantings,
      );

      expect(response).toStrictEqual(expectedResponse);
      expect(mockPrismaService.property.findUnique).toHaveBeenCalledWith({
        where: { id: mockProperty.id },
        include: {},
      });
      expect(mockPrismaService.planting.createMany).toHaveBeenCalledWith({
        data: mockPlantings.map((planting) => ({
          ...planting,
          harvest: new Date(planting.plantingDate).getFullYear(),
          propertyId: mockProperty.id,
        })),
      });
    });

    it('should throw NotFoundException if property not found', async () => {
      mockPrismaService.property.findUnique.mockResolvedValue(null);

      await expect(
        propertyService.addPlantingToProperty(mockProperty.id, []),
      ).rejects.toThrow(NotFoundException);
      expect(mockPrismaService.property.findUnique).toHaveBeenCalledWith({
        where: { id: mockProperty.id },
        include: {},
      });
      expect(mockPrismaService.planting.createMany).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete a property if it exists', async () => {
      mockPrismaService.property.findUnique.mockResolvedValue(mockProperty);
      await propertyService.remove(mockProperty.id);

      expect(mockPrismaService.property.findUnique).toHaveBeenCalledWith({
        where: { id: mockProperty.id },
        include: {},
      });
      expect(mockPrismaService.property.delete).toHaveBeenCalledWith({
        where: { id: mockProperty.id },
      });
      expect(propertyService.remove(mockProperty.id)).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if the property does not exist', async () => {
      mockPrismaService.property.findUnique.mockResolvedValue(null);

      await expect(propertyService.remove(mockProperty.id)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.property.findUnique).toHaveBeenCalledWith({
        where: { id: mockProperty.id },
        include: {},
      });
      expect(mockPrismaService.property.delete).not.toHaveBeenCalled();
    });
  });
});
