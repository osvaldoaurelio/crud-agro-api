import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';

class BadRequest {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;

  @ApiProperty({
    example: ['property must be a string', 'property should not be empty'],
  })
  message: string[];

  @ApiProperty({ example: 'Bad request' })
  error: string;
}

class InternalServerError {
  @ApiProperty({ example: HttpStatus.INTERNAL_SERVER_ERROR })
  statusCode: number;

  @ApiProperty({ example: 'Internal server error' })
  message: string;

  @ApiProperty({ example: 'Internal server error' })
  error: string;
}

class NotFound {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number;

  @ApiProperty({ example: 'Resource not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: string;
}

class UnprocessableEntity {
  @ApiProperty({ example: HttpStatus.UNPROCESSABLE_ENTITY })
  statusCode: number;

  @ApiProperty({ example: 'unique property already taken' })
  message: string;

  @ApiProperty({ example: 'Unprocessable Entity' })
  error: string;
}

export class Exceptions {
  static badRequest: ApiResponseOptions = {
    description: 'Error: Bad request',
    type: BadRequest,
  };

  static internalServerError: ApiResponseOptions = {
    description: 'Error: Internal server error',
    type: InternalServerError,
  };

  static notFound: ApiResponseOptions = {
    description: 'Error: Not found',
    type: NotFound,
  };

  static unprocessableEntity: ApiResponseOptions = {
    description: 'Error: Unprocessable entity',
    type: UnprocessableEntity,
  };
}
