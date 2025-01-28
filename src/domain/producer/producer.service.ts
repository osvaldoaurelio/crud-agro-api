import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProducerDto } from '../producer/dto/create-producer.dto';
import { UpdateProducerDto } from '../producer/dto/update-producer.dto';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseProducerDto } from '../producer/dto/response-producer.dto';
import { CreatePropertyDto } from '../property/dto/create-property-dto';

@Injectable()
export class ProducerService {
  constructor(private readonly prismaService: PrismaService) {}

  private includePlantings = { properties: { include: { plantings: true } } };

  private async findProducerOrThrow(id: string, include = {}) {
    const producer = await this.prismaService.producer.findUnique({
      where: { id },
      include,
    });

    if (!producer) {
      throw new NotFoundException(`Producer with ID ${id} not found.`);
    }

    return producer;
  }

  async create(createProducerDto: CreateProducerDto) {
    const { properties, ...producerData } = createProducerDto;

    const producerCreated = await this.prismaService.producer.create({
      data: {
        ...producerData,
        properties: {
          create: properties?.map((property) => ({
            ...property,
            plantings: {
              create: property.plantings?.map((planting) => ({
                ...planting,
                harvest: new Date(planting.plantingDate).getFullYear(),
              })),
            },
          })),
        },
      },
      include: this.includePlantings,
    });

    return plainToInstance(ResponseProducerDto, producerCreated);
  }

  async findAll(page: number, limit: number) {
    const args = {
      skip: (page - 1) * limit,
      take: limit,
      include: this.includePlantings,
    };

    const [producers, totalItems] = await Promise.all([
      this.prismaService.producer.findMany(args),
      this.prismaService.producer.count(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      currentPage: page,
      totalItems,
      totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      data: plainToInstance(ResponseProducerDto, producers),
    };
  }

  async findOne(id: string) {
    const producer = await this.findProducerOrThrow(id, this.includePlantings);

    return plainToInstance(ResponseProducerDto, producer);
  }

  async update(id: string, updateProducerDto: UpdateProducerDto) {
    await this.findProducerOrThrow(id);

    const updatedProducer = await this.prismaService.producer.update({
      where: { id },
      data: updateProducerDto,
    });

    return plainToInstance(ResponseProducerDto, updatedProducer);
  }

  async addPropertyToProducer(id: string, properties: CreatePropertyDto[]) {
    await this.findProducerOrThrow(id);

    await this.prismaService.property.createMany({
      data: properties.map((property) => ({
        ...property,
        producerId: id,
        plantings: {
          create: property.plantings?.map((planting) => ({
            ...planting,
            harvest: new Date(planting.plantingDate).getFullYear(),
          })),
        },
      })),
    });

    const producer = await this.findProducerOrThrow(id, this.includePlantings);

    return plainToInstance(ResponseProducerDto, producer);
  }

  async remove(id: string) {
    await this.findProducerOrThrow(id);

    await this.prismaService.producer.delete({
      where: { id },
    });
  }
}
