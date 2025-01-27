import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { UpdatePropertyDto } from './dto/update-property-dto';

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

    return property;
  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
    await this.findPropertyOrThrow(id);

    const updatedProperty = await this.prismaService.property.update({
      where: { id },
      data: updatePropertyDto,
    });

    return updatedProperty;
  }

  async addPlantingToProperty(id: string, plantings: any[]) {
    await this.findPropertyOrThrow(id);

    await this.prismaService.planting.createMany({
      data: plantings.map((planting) => ({
        ...planting,
        propertyId: id,
      })),
    });

    const property = await this.findPropertyOrThrow(id, true);

    return property;
  }

  async remove(id: string) {
    await this.findPropertyOrThrow(id);

    await this.prismaService.property.delete({
      where: { id },
    });
  }
}
