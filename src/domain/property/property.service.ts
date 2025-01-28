import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { UpdatePropertyDto } from './dto/update-property-dto';
import { plainToInstance } from 'class-transformer';
import { ResponsePropertyDto } from './dto/response-property.dto';
import { ResponsePropertySumaryDto } from './dto/response-property-sumary.dto';

@Injectable()
export class PropertyService {
  constructor(private readonly prismaService: PrismaService) {}

  private async findPropertyOrThrow(id: string, plantings = false) {
    const property = await this.prismaService.property.findUnique({
      where: { id },
      include: { plantings },
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found.`);
    }

    return property;
  }

  async findOne(id: string) {
    const property = await this.findPropertyOrThrow(id, true);

    return plainToInstance(ResponsePropertyDto, property);
  }

  async getSumary() {
    const [
      totalCountProperties,
      totalAreaHectares,
      propertiesByState,
      propertiesByCrop,
      propertiesByLandUse,
    ] = await Promise.all([
      this.prismaService.property.count(),
      this.prismaService.property.aggregate({
        _sum: { totalArea: true },
      }),
      this.prismaService.property.groupBy({
        by: ['state'],
        _count: true,
      }),
      this.prismaService.planting.groupBy({
        by: ['cropName', 'harvest'],
        _count: true,
      }),
      this.prismaService.property.aggregate({
        _sum: { arableArea: true, vegetationArea: true },
      }),
    ]);

    return plainToInstance(ResponsePropertySumaryDto, {
      totalCountProperties,
      totalAreaHectares,
      propertiesByState,
      propertiesByCrop,
      propertiesByLandUse,
    });
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    await this.findPropertyOrThrow(id);

    const updatedProperty = await this.prismaService.property.update({
      where: { id },
      data: updatePropertyDto,
    });

    return plainToInstance(ResponsePropertyDto, updatedProperty);
  }

  async addPlantingToProperty(id: string, plantings: any[]) {
    await this.findPropertyOrThrow(id);

    await this.prismaService.planting.createMany({
      data: plantings.map((planting) => ({
        ...planting,
        harvest: new Date(planting.plantingDate).getFullYear(),
        propertyId: id,
      })),
    });

    const property = await this.findPropertyOrThrow(id, true);

    return plainToInstance(ResponsePropertyDto, property);
  }

  async remove(id: string) {
    await this.findPropertyOrThrow(id);

    await this.prismaService.property.delete({
      where: { id },
    });
  }
}
