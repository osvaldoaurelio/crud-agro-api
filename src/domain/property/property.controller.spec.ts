import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Property } from '@prisma/client';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { CreatePlantingDto } from '../planting/dto/create-planting.dto';
import { UpdatePropertyDto } from './dto/update-property-dto';

describe('PropertyController', () => {
  let propertyController: PropertyController;

  const mockProperty = {
    id: 'ckv4',
    propertyName: 'Property Name',
    // other fields...
  } as Property;

  const mockPropertyService = {
    findOne: jest.fn(),
    getSumary: jest.fn(),
    update: jest.fn(),
    addPlantingToProperty: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      controllers: [PropertyController],
      providers: [
        {
          provide: PropertyService,
          useValue: mockPropertyService,
        },
      ],
    }).compile();

    propertyController =
      testingModule.get<PropertyController>(PropertyController);
  });

  describe('findOne', () => {
    it('should return a property if it exists', async () => {
      mockPropertyService.findOne.mockResolvedValue(mockProperty);
      const response = await propertyController.findOne(mockProperty.id);

      expect(response).toBe(mockProperty);
      expect(mockPropertyService.findOne).toHaveBeenCalledWith(mockProperty.id);
    });

    it('should throw NotFoundException if property not found', async () => {
      mockPropertyService.findOne.mockRejectedValue(new NotFoundException());

      await expect(propertyController.findOne(mockProperty.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getSumary', () => {
    it('should return a property sumary', async () => {
      const mockSumary = {
        totalProperties: 10,
        // other fields...
      };

      mockPropertyService.getSumary.mockResolvedValue(mockSumary);
      const response = await propertyController.getSumary();

      expect(response).toBe(mockSumary);
      expect(mockPropertyService.getSumary).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a property if it exists', async () => {
      const mockUpdateProperty = { propertyName: 'Updated Name' };
      const expectedResponse = { ...mockProperty, ...mockUpdateProperty };

      mockPropertyService.update.mockResolvedValue(expectedResponse);
      const response = await propertyController.update(
        mockProperty.id,
        mockUpdateProperty,
      );

      expect(response).toBe(expectedResponse);
      expect(mockPropertyService.update).toHaveBeenCalledWith(
        mockProperty.id,
        mockUpdateProperty,
      );
    });

    it('should throw NotFoundException if property not found', async () => {
      mockPropertyService.update.mockRejectedValue(new NotFoundException());

      await expect(
        propertyController.update(mockProperty.id, {} as UpdatePropertyDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('addPlantingToProperty', () => {
    const mockPlantings = [
      { plantingDate: new Date(), cropName: 'Corn' },
      { plantingDate: new Date(), cropName: 'Soybean' },
    ] as CreatePlantingDto[];

    it('should add plantings to a property if it exists', async () => {
      const expectedResponse = { ...mockProperty, plantings: mockPlantings };

      mockPropertyService.addPlantingToProperty.mockResolvedValue(
        expectedResponse,
      );
      const response = await propertyController.addPlantingToProperty(
        mockProperty.id,
        mockPlantings,
      );

      expect(response).toBe(expectedResponse);
      expect(mockPropertyService.addPlantingToProperty).toHaveBeenCalledWith(
        mockProperty.id,
        mockPlantings,
      );
    });

    it('should throw NotFoundException if property not found', async () => {
      mockPropertyService.addPlantingToProperty.mockRejectedValue(
        new NotFoundException(),
      );

      await expect(
        propertyController.addPlantingToProperty(
          mockProperty.id,
          mockPlantings,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe.only('remove', () => {
    it('should remove a property if it exists', async () => {
      mockPropertyService.remove.mockResolvedValue(undefined);

      const response = await propertyController.remove(mockProperty.id);

      expect(mockPropertyService.remove).toHaveBeenCalledWith(mockProperty.id);
      expect(response).toBeUndefined();
    });

    it('should throw NotFoundException if property not found', async () => {
      mockPropertyService.remove.mockRejectedValue(new NotFoundException());

      await expect(propertyController.remove(mockProperty.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
