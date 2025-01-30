import { Test, TestingModule } from '@nestjs/testing';
import { PlantingController } from './planting.controller';
import { PlantingService } from './planting.service';
import { NotFoundException } from '@nestjs/common';

describe('PlantingController', () => {
  let plantingController: PlantingController;

  const mockPlantingService = {
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantingController],
      providers: [
        {
          provide: PlantingService,
          useValue: mockPlantingService,
        },
      ],
    }).compile();

    plantingController = module.get<PlantingController>(PlantingController);
  });

  describe('findOne', () => {
    it('should return a planting', async () => {
      const planting = {
        id: 'ckv4',
        cropName: 'corn',
        plantingDate: new Date(),
      };

      mockPlantingService.findOne.mockResolvedValue(planting);
      const result = await plantingController.findOne('ckv4');

      expect(result).toBe(planting);
      expect(mockPlantingService.findOne).toHaveBeenCalledWith('ckv4');
    });

    it('should throw NotFoundException if planting not found', async () => {
      mockPlantingService.findOne.mockRejectedValue(new NotFoundException());

      await expect(plantingController.findOne('ckv4')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a planting', async () => {
      mockPlantingService.remove.mockResolvedValue(undefined);

      expect(await plantingController.remove('ckv4')).toBeUndefined();
      expect(mockPlantingService.remove).toHaveBeenCalledWith('ckv4');
    });

    it('should throw NotFoundException if planting to remove not found', async () => {
      mockPlantingService.remove.mockRejectedValue(new NotFoundException());

      await expect(plantingController.remove('ckv4')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
