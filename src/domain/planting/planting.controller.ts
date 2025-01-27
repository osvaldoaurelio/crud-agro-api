import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlantingService } from './planting.service';
import { CreatePlantingDto } from './dto/create-planting.dto';
import { UpdatePlantingDto } from './dto/update-planting.dto';

@Controller('planting')
export class PlantingController {
  constructor(private readonly plantingService: PlantingService) {}

  @Post()
  create(@Body() createPlantingDto: CreatePlantingDto) {
    return this.plantingService.create(createPlantingDto);
  }

  @Get()
  findAll() {
    return this.plantingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plantingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlantingDto: UpdatePlantingDto) {
    return this.plantingService.update(+id, updatePlantingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantingService.remove(+id);
  }
}
