import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PropertyPropertyDoc } from 'src/common/modules/swagger/docs/domain/property/property-property-doc';
import { PropertyService } from './property.service';
import { ParseCuidPipe } from 'src/common/pipes/parse-cuid.pipe';
import { UpdatePropertyDto } from './dto/update-property-dto';
import { CreatePlantingDto } from '../planting/dto/create-planting.dto';
import { OperationPropertyDoc } from 'src/common/modules/swagger/docs/domain/property/operation-property-doc';
import { ResponsePropertyDoc } from 'src/common/modules/swagger/docs/domain/property/response-property-doc';
import { Exceptions } from 'src/common/modules/swagger/docs/exceptions';

@ApiTags(PropertyPropertyDoc.tagName)
@Controller('propertys')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @ApiOperation(OperationPropertyDoc.findOne)
  @ApiOkResponse(ResponsePropertyDoc.findOne)
  @ApiNotFoundResponse(Exceptions.notFound)
  @ApiInternalServerErrorResponse(Exceptions.internalServerError)
  @Get(':id')
  findOne(@Param('id', ParseCuidPipe) id: string) {
    return this.propertyService.findOne(id);
  }

  @ApiOperation(OperationPropertyDoc.update)
  @ApiOkResponse(ResponsePropertyDoc.update)
  @ApiBadRequestResponse(Exceptions.badRequest)
  @ApiNotFoundResponse(Exceptions.notFound)
  @ApiInternalServerErrorResponse(Exceptions.internalServerError)
  @Patch(':id')
  update(
    @Param('id', ParseCuidPipe) id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @ApiOperation(OperationPropertyDoc.addPlantingToProperty)
  @ApiOkResponse(ResponsePropertyDoc.addPlantingToProperty)
  @ApiBadRequestResponse(Exceptions.badRequest)
  @ApiNotFoundResponse(Exceptions.notFound)
  @ApiInternalServerErrorResponse(Exceptions.internalServerError)
  @Patch(':id/plantings')
  addPlantingToProperty(
    @Param('id', ParseCuidPipe) id: string,
    @Body() plantings: CreatePlantingDto[],
  ) {
    return this.propertyService.addPlantingToProperty(id, plantings);
  }

  @ApiOperation(OperationPropertyDoc.remove)
  @ApiNoContentResponse(ResponsePropertyDoc.remove)
  @ApiNotFoundResponse(Exceptions.notFound)
  @ApiInternalServerErrorResponse(Exceptions.internalServerError)
  @Delete(':id')
  remove(@Param('id', ParseCuidPipe) id: string) {
    return this.propertyService.remove(id);
  }
}
