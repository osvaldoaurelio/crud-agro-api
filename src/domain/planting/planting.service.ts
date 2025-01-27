import { Injectable } from '@nestjs/common';
import { CreatePlantingDto } from './dto/create-planting.dto';
import { UpdatePlantingDto } from './dto/update-planting.dto';

@Injectable()
export class PlantingService {
  create(createPlantingDto: CreatePlantingDto) {
    return 'This action adds a new planting';
  }

  findAll() {
    return `This action returns all planting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planting`;
  }

  update(id: number, updatePlantingDto: UpdatePlantingDto) {
    return `This action updates a #${id} planting`;
  }

  remove(id: number) {
    return `This action removes a #${id} planting`;
  }
}
