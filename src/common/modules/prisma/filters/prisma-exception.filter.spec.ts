import { Prisma } from '@prisma/client';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from './prisma-exception.filter';

describe('PrismaClientKnownRequestError Filter', () => {
  let filter: PrismaClientKnownRequestError;
  let mockResponse: Partial<Response>;
  let mockHost: Partial<ArgumentsHost>;

  beforeEach(() => {
    filter = new PrismaClientKnownRequestError();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue(mockResponse),
      }),
    };
  });

  it('should return 422 Unprocessable Entity for P2002 error', () => {
    const exception = new Prisma.PrismaClientKnownRequestError(
      'Unique constraint failed',
      {
        code: 'P2002',
        clientVersion: '4.0.0',
        meta: { target: ['email'] },
      },
    );

    filter.catch(exception, mockHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: 'email already taken',
      error: 'Unprocessable Entity',
    });
  });

  it('should not handle errors with other Prisma codes', () => {
    const exception = new Prisma.PrismaClientKnownRequestError(
      'Some other error',
      {
        code: 'P2003',
        clientVersion: '4.0.0',
      },
    );

    const result = filter.catch(exception, mockHost as ArgumentsHost);

    expect(result).toBeUndefined();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
