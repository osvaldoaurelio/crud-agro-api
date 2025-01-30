import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from './producer.service';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { CreateProducerDto } from '../producer/dto/create-producer.dto';
import { UpdateProducerDto } from '../producer/dto/update-producer.dto';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ResponseProducerDto } from '../producer/dto/response-producer.dto';
import { CreatePropertyDto } from '../property/dto/create-property-dto';

describe('ProducerService', () => {
  let service: ProducerService;

  const mockPrismaService = {
    producer: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    property: {
      createMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = testingModule.get<ProducerService>(ProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a producer', async () => {
      const createProducerDto: CreateProducerDto = {
        fullName: 'Producer Name',
        cpfOrCnpj: '12345678901',
        properties: [],
      };
      const createdProducer = {
        id: 'producerId',
        ...createProducerDto,
        createdAt: undefined,
        updatedAt: undefined,
      };

      mockPrismaService.producer.create.mockResolvedValue(createdProducer);

      expect(await service.create(createProducerDto)).toEqual(
        plainToInstance(ResponseProducerDto, createdProducer),
      );
      expect(mockPrismaService.producer.create).toHaveBeenCalledWith({
        data: {
          ...createProducerDto,
          properties: {
            create: [],
          },
        },
        include: { properties: { include: { plantings: true } } },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of producers', async () => {
      const producers = [
        {
          id: '1',
          fullName: 'Producer 1',
          cpfOrCnpj: null,
          createdAt: undefined,
          updatedAt: undefined,
          properties: undefined,
        },
      ];
      const totalItems = 1;

      mockPrismaService.producer.findMany.mockResolvedValue(producers);
      mockPrismaService.producer.count.mockResolvedValue(totalItems);

      expect(await service.findAll(1, 10)).toEqual({
        currentPage: 1,
        totalItems,
        totalPages: 1,
        nextPage: null,
        data: plainToInstance(ResponseProducerDto, producers),
      });
    });
  });

  describe('findOne', () => {
    it('should return a producer', async () => {
      const producer = {
        id: '1',
        fullName: 'Producer 1',
        cpfOrCnpj: null,
        createdAt: undefined,
        updatedAt: undefined,
        properties: undefined,
      };

      mockPrismaService.producer.findUnique.mockResolvedValue(producer);

      expect(await service.findOne('1')).toEqual(
        plainToInstance(ResponseProducerDto, producer),
      );
    });

    it('should throw NotFoundException if producer not found', async () => {
      mockPrismaService.producer.findUnique.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a producer', async () => {
      const updateProducerDto: UpdateProducerDto = { fullName: 'Updated Name' };
      const producer = {
        id: '1',
        fullName: 'Producer 1',
        cpfOrCnpj: null,
        createdAt: undefined,
        updatedAt: undefined,
        properties: undefined,
      };
      const updatedProducer = {
        id: '1',
        ...updateProducerDto,
        createdAt: undefined,
        updatedAt: undefined,
      };

      mockPrismaService.producer.findUnique.mockResolvedValue(producer);
      mockPrismaService.producer.update.mockResolvedValue(updatedProducer);

      expect(await service.update('1', updateProducerDto)).toEqual(
        plainToInstance(ResponseProducerDto, updatedProducer),
      );
      expect(mockPrismaService.producer.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateProducerDto,
      });
    });
  });

  describe('addPropertyToProducer', () => {
    it('should add properties to a producer', async () => {
      const properties: CreatePropertyDto[] = [
        {
          propertyName: 'Property 1',
          city: 'City 1',
          state: 'SP',
          totalArea: 100,
          arableArea: 50,
          vegetationArea: 30,
          plantings: [],
        },
      ];
      const producer = {
        id: '1',
        fullName: 'Producer 1',
        cpfOrCnpj: null,
        createdAt: undefined,
        updatedAt: undefined,
        properties: properties.map((property) => ({
          ...property,
          createdAt: undefined,
          updatedAt: undefined,
          id: undefined,
        })),
      };

      mockPrismaService.producer.findUnique.mockResolvedValue(producer);
      mockPrismaService.property.createMany.mockResolvedValue({
        count: properties.length,
      });

      expect(await service.addPropertyToProducer('1', properties)).toEqual(
        plainToInstance(ResponseProducerDto, producer),
      );
    });
  });

  describe('remove', () => {
    it('should remove a producer', async () => {
      const producer = {
        id: '1',
        fullName: 'Producer 1',
        cpfOrCnpj: null,
        createdAt: undefined,
        updatedAt: undefined,
        properties: undefined,
      };

      mockPrismaService.producer.findUnique.mockResolvedValue(producer);

      await service.remove('1');
      expect(mockPrismaService.producer.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
