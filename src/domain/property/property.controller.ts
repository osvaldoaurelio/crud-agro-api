import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PropertyPropertyDoc } from 'src/common/modules/swagger/docs/property/property-property-doc';
import { PropertyService } from './property.service';
import { ParseCuidPipe } from 'src/common/pipes/parse-cuid.pipe';
import { UpdatePropertyDto } from './dto/update-property-dto';
import { CreatePlantingDto } from '../planting/dto/create-planting.dto';

@ApiTags(PropertyPropertyDoc.tagName)
@Controller('propertys')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get(':id')
  findOne(@Param('id', ParseCuidPipe) id: string) {
    return this.propertyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseCuidPipe) id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @Patch(':id/plantings')
  addPlantingToProperty(
    @Param('id', ParseCuidPipe) id: string,
    @Body() plantings: CreatePlantingDto[],
  ) {
    return this.propertyService.addPlantingToProperty(id, plantings);
  }

  @Delete(':id')
  remove(@Param('id', ParseCuidPipe) id: string) {
    return this.propertyService.remove(id);
  }
}
