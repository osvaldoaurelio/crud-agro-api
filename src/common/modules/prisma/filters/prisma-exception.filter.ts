import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientKnownRequestError implements ExceptionFilter {
  private readonly PrismaCodeException = 'P2002';

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error({ exception });

    if (exception.code === this.PrismaCodeException) {
      const response = host.switchToHttp().getResponse<Response>();

      const [uniqueProperty] = exception.meta?.target as string[];

      response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: `${uniqueProperty} already taken`,
        error: 'Unprocessable Entity',
      });
    }
  }
}
