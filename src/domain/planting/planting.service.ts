import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { ResponsePlantingDto } from './dto/response-planting.dto';

@Injectable()
export class PlantingService {
  constructor(private readonly prismaService: PrismaService) {}

  private async findPlantingOrThrow(id: string) {
    const planting = await this.prismaService.planting.findUnique({
      where: { id },
    });

    if (!planting) {
      throw new NotFoundException(`Planting with ID ${id} not found.`);
    }

    return planting;
  }

  async findOne(id: string) {
    const planting = await this.findPlantingOrThrow(id);

    return plainToInstance(ResponsePlantingDto, planting);
  }

  async remove(id: string) {
    await this.findPlantingOrThrow(id);

    await this.prismaService.planting.delete({
      where: { id },
    });
  }
}
