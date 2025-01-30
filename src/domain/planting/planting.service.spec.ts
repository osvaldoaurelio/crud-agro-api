import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { ResponsePlantingDto } from './dto/response-planting.dto';
import { PlantingService } from './planting.service';
import { plainToInstance } from 'class-transformer';

describe('PlantingService', () => {
  let plantingService: PlantingService;

  const mockPrismaService = {
    planting: {
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        PlantingService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    plantingService = testingModule.get<PlantingService>(PlantingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return a planting if it exists', async () => {
      const mockPlanting = {
        id: 'ckv4',
        cropName: 'corn',
        plantingDate: new Date(),
      };
      const expectedResponse = plainToInstance(
        ResponsePlantingDto,
        mockPlanting,
      );

      mockPrismaService.planting.findUnique.mockResolvedValue(mockPlanting);
      const result = await plantingService.findOne('ckv4');

      expect(result).toEqual(expectedResponse);
      expect(mockPrismaService.planting.findUnique).toHaveBeenCalledWith({
        where: { id: 'ckv4' },
      });
    });

    it('should throw NotFoundException if the planting does not exist', async () => {
      mockPrismaService.planting.findUnique.mockResolvedValue(null);

      await expect(plantingService.findOne('ckv4')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.planting.findUnique).toHaveBeenCalledWith({
        where: { id: 'ckv4' },
      });
    });
  });

  describe('remove', () => {
    it('should delete a planting if it exists', async () => {
      const mockPlanting = {
        id: 'ckv4',
        cropName: 'corn',
        plantingDate: new Date(),
      };
      mockPrismaService.planting.findUnique.mockResolvedValue(mockPlanting);
      mockPrismaService.planting.delete.mockResolvedValue(mockPlanting);

      await plantingService.remove('ckv4');
      expect(mockPrismaService.planting.findUnique).toHaveBeenCalledWith({
        where: { id: 'ckv4' },
      });
      expect(mockPrismaService.planting.delete).toHaveBeenCalledWith({
        where: { id: 'ckv4' },
      });
    });

    it('should throw NotFoundException if the planting does not exist', async () => {
      mockPrismaService.planting.findUnique.mockResolvedValue(null);

      await expect(plantingService.remove('ckv4')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.planting.findUnique).toHaveBeenCalledWith({
        where: { id: 'ckv4' },
      });
      expect(mockPrismaService.planting.delete).not.toHaveBeenCalled();
    });
  });
});
