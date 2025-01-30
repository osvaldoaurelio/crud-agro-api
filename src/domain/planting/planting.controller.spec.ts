import { Test, TestingModule } from '@nestjs/testing';
import { PlantingController } from './planting.controller';
import { PlantingService } from './planting.service';
import { NotFoundException } from '@nestjs/common';
import { Planting } from '@prisma/client';

describe('PlantingController', () => {
  let plantingController: PlantingController;

  const mockPlanting = {
    id: 'ckv4',
    cropName: 'corn',
    // other fields...
  } as Planting;

  const mockPlantingService = {
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      controllers: [PlantingController],
      providers: [
        {
          provide: PlantingService,
          useValue: mockPlantingService,
        },
      ],
    }).compile();

    plantingController =
      testingModule.get<PlantingController>(PlantingController);
  });

  describe('findOne', () => {
    it('should return a planting if it exists', async () => {
      mockPlantingService.findOne.mockResolvedValue(mockPlanting);
      const response = await plantingController.findOne(mockPlanting.id);

      expect(response).toBe(mockPlanting);
      expect(mockPlantingService.findOne).toHaveBeenCalledWith(mockPlanting.id);
    });

    it('should throw NotFoundException if planting not found', async () => {
      mockPlantingService.findOne.mockRejectedValue(new NotFoundException());

      await expect(plantingController.findOne(mockPlanting.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a planting if it exists', async () => {
      mockPlantingService.remove.mockResolvedValue(undefined);

      const response = await plantingController.remove(mockPlanting.id);

      expect(mockPlantingService.remove).toHaveBeenCalledWith(mockPlanting.id);
      expect(response).toBeUndefined();
    });

    it('should throw NotFoundException if planting to remove not found', async () => {
      mockPlantingService.remove.mockRejectedValue(new NotFoundException());

      await expect(plantingController.remove(mockPlanting.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
