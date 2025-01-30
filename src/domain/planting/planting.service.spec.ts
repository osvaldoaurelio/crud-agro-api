import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { ResponsePlantingDto } from './dto/response-planting.dto';
import { PlantingService } from './planting.service';
import { plainToInstance } from 'class-transformer';

describe('PlantingService', () => {
  let plantingService: PlantingService;

  const mockPlanting = {
    id: 'cvk4',
    cropName: 'corn',
    // other fields...
  };

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
      const expectedResponse = plainToInstance(
        ResponsePlantingDto,
        mockPlanting,
      );

      mockPrismaService.planting.findUnique.mockResolvedValue(mockPlanting);
      const response = await plantingService.findOne(mockPlanting.id);

      expect(response).toStrictEqual(expectedResponse);
      expect(mockPrismaService.planting.findUnique).toHaveBeenCalledWith({
        where: { id: mockPlanting.id },
      });
    });

    it('should throw NotFoundException if the planting does not exist', async () => {
      mockPrismaService.planting.findUnique.mockResolvedValue(null);

      await expect(plantingService.findOne(mockPlanting.id)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.planting.findUnique).toHaveBeenCalledWith({
        where: { id: mockPlanting.id },
      });
    });
  });

  describe('remove', () => {
    it('should delete a planting if it exists', async () => {
      mockPrismaService.planting.findUnique.mockResolvedValue(mockPlanting);
      await plantingService.remove(mockPlanting.id);

      expect(mockPrismaService.planting.findUnique).toHaveBeenCalledWith({
        where: { id: mockPlanting.id },
      });
      expect(mockPrismaService.planting.delete).toHaveBeenCalledWith({
        where: { id: mockPlanting.id },
      });
    });

    it('should throw NotFoundException if the planting does not exist', async () => {
      mockPrismaService.planting.findUnique.mockResolvedValue(null);

      await expect(plantingService.remove(mockPlanting.id)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPrismaService.planting.findUnique).toHaveBeenCalledWith({
        where: { id: mockPlanting.id },
      });
      expect(mockPrismaService.planting.delete).not.toHaveBeenCalled();
    });
  });
});
