import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import * as winston from 'winston';

describe('LoggerService', () => {
  let service: LoggerService;
  let loggerMock: jest.Mocked<winston.Logger>;

  beforeEach(async () => {
    loggerMock = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
      log: jest.fn(),
    } as unknown as jest.Mocked<winston.Logger>;

    jest.spyOn(winston, 'createLogger').mockReturnValue(loggerMock);

    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    service = testingModule.get<LoggerService>(LoggerService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log info messages', () => {
    service.log('Test info message');

    expect(loggerMock.info).toHaveBeenCalledWith('Test info message');
  });

  it('should log error messages', () => {
    service.error('Test error message', 'stack trace');

    expect(loggerMock.error).toHaveBeenCalledWith(
      'Test error message',
      'stack trace',
    );
  });

  it('should log warning messages', () => {
    service.warn('Test warning message');

    expect(loggerMock.warn).toHaveBeenCalledWith('Test warning message');
  });

  it('should log debug messages', () => {
    service.debug('Test debug message');

    expect(loggerMock.debug).toHaveBeenCalledWith('Test debug message');
  });

  it('should log verbose messages', () => {
    service.verbose('Test verbose message');

    expect(loggerMock.verbose).toHaveBeenCalledWith('Test verbose message');
  });
});
