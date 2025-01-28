import { Controller, Delete, Get, Param } from '@nestjs/common';
import { PlantingService } from './planting.service';
import {
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { OperationPlantingDoc } from 'src/common/modules/swagger/docs/domain/planting/operation-planting-doc';
import { Exceptions } from 'src/common/modules/swagger/docs/exceptions';
import { ParseCuidPipe } from 'src/common/pipes/parse-cuid.pipe';
import { ResponsePlantingDoc } from 'src/common/modules/swagger/docs/domain/planting/response-planting-doc';

@Controller('planting')
export class PlantingController {
  constructor(private readonly plantingService: PlantingService) {}

  @ApiOperation(OperationPlantingDoc.findOne)
  @ApiOkResponse(ResponsePlantingDoc.findOne)
  @ApiNotFoundResponse(Exceptions.notFound)
  @ApiInternalServerErrorResponse(Exceptions.internalServerError)
  @Get(':id')
  findOne(@Param('id', ParseCuidPipe) id: string) {
    return this.plantingService.findOne(id);
  }

  @ApiOperation(OperationPlantingDoc.remove)
  @ApiNoContentResponse(ResponsePlantingDoc.remove)
  @ApiNotFoundResponse(Exceptions.notFound)
  @ApiInternalServerErrorResponse(Exceptions.internalServerError)
  @Delete(':id')
  remove(@Param('id', ParseCuidPipe) id: string) {
    return this.plantingService.remove(id);
  }
}
