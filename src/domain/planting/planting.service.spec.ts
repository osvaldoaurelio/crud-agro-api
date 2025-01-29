import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { ResponsePlantingDto } from './dto/response-planting.dto';
import { PlantingService } from './planting.service';

describe('PlantingService', () => {
  let plantingService: PlantingService;

  const mockPrismaService = {
    planting: {
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantingService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    plantingService = module.get<PlantingService>(PlantingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return a planting if it exists', async () => {
      const mockPlanting = { id: '1', cropName: 'corn', harvest: '2023' };
      mockPrismaService.planting.findUnique.mockResolvedValue(mockPlanting);

      const result = await plantingService.findOne('1');
      expect(result).toEqual(expect.any(ResponsePlantingDto));
      expect(mockPrismaService.planting.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if the planting does not exist', async () => {
      mockPrismaService.planting.findUnique.mockResolvedValue(null);

      await expect(plantingService.findOne('1')).rejects.toThrow(
        new NotFoundException(`Planting with ID 1 not found.`),
      );
      expect(mockPrismaService.planting.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('remove', () => {
    it('should delete a planting if it exists', async () => {
      const mockPlanting = { id: '1', cropName: 'corn', harvest: '2023' };
      mockPrismaService.planting.findUnique.mockResolvedValue(mockPlanting);
      mockPrismaService.planting.delete.mockResolvedValue(mockPlanting);

      await plantingService.remove('1');
      expect(mockPrismaService.planting.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(mockPrismaService.planting.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if the planting does not exist', async () => {
      mockPrismaService.planting.findUnique.mockResolvedValue(null);

      await expect(plantingService.remove('1')).rejects.toThrow(
        new NotFoundException(`Planting with ID 1 not found.`),
      );
      expect(mockPrismaService.planting.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(mockPrismaService.planting.delete).not.toHaveBeenCalled();
    });
  });
});
