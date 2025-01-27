import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { PrismaClientKnownRequestError } from 'src/common/modules/prisma/filters/prisma-exception.filter';
import { Exceptions } from 'src/common/modules/swagger/docs/exceptions';
import { OperationProducerDoc } from 'src/common/modules/swagger/docs/producer/operation-producer-doc';
import { PropertyProducerDoc } from 'src/common/modules/swagger/docs/producer/property-producer-doc';
import { ResponseProducerDoc } from 'src/common/modules/swagger/docs/producer/response-producer-doc';
import { ParseCuidPipe } from 'src/common/pipes/parse-cuid.pipe';
import { CreateProducerDto } from '../producer/dto/create-producer.dto';
import { UpdateProducerDto } from '../producer/dto/update-producer.dto';
import { ProducerService } from './producer.service';
import { QueryProducerDoc } from 'src/common/modules/swagger/docs/producer/query-producer-doc';
import { CreatePropertyDto } from '../property/dto/create-property-dto';

@ApiTags(PropertyProducerDoc.tagName)
@Controller('producers')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @ApiOperation(OperationProducerDoc.create)
  @ApiCreatedResponse(ResponseProducerDoc.create)
  @ApiBadRequestResponse(Exceptions.badRequest)
  @ApiUnprocessableEntityResponse(Exceptions.unprocessableEntity)
  @ApiInternalServerErrorResponse(Exceptions.internalServerError)
  @UseFilters(PrismaClientKnownRequestError)
  @Post()
  create(@Body() createProducerDto: CreateProducerDto) {
    console.log({ createProducerDto });
    return this.producerService.create(createProducerDto);
  }

  @ApiOperation(OperationProducerDoc.findAll)
  @ApiOkResponse(ResponseProducerDoc.findAll)
  @ApiInternalServerErrorResponse(Exceptions.internalServerError)
  @ApiQuery(QueryProducerDoc.page)
  @ApiQuery(QueryProducerDoc.limit)
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.producerService.findAll(page, limit);
  }

  @ApiOperation(OperationProducerDoc.findOne)
  @ApiOkResponse(ResponseProducerDoc.findOne)
  @ApiNotFoundResponse(Exceptions.notFound)
  @ApiInternalServerErrorResponse(Exceptions.internalServerError)
  @Get(':id')
  findOne(@Param('id', ParseCuidPipe) id: string) {
    return this.producerService.findOne(id);
  }

  @ApiOperation(OperationProducerDoc.update)
  @ApiOkResponse(ResponseProducerDoc.update)
  @ApiBadRequestResponse(Exceptions.badRequest)
  @ApiNotFoundResponse(Exceptions.notFound)
  @ApiInternalServerErrorResponse(Exceptions.internalServerError)
  @Patch(':id')
  update(
    @Param('id', ParseCuidPipe) id: string,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return this.producerService.update(id, updateProducerDto);
  }

  @Patch(':id/properties')
  addPropertyToProducer(
    @Param('id', ParseCuidPipe) id: string,
    @Body() properties: CreatePropertyDto[],
  ) {
    return this.producerService.addPropertyToProducer(id, properties);
  }

  @ApiOperation(OperationProducerDoc.remove)
  @ApiNoContentResponse(ResponseProducerDoc.remove)
  @ApiBadRequestResponse(Exceptions.badRequest)
  @ApiNotFoundResponse(Exceptions.notFound)
  @ApiInternalServerErrorResponse(Exceptions.internalServerError)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseCuidPipe) id: string) {
    return this.producerService.remove(id);
  }
}
