import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import { Config } from './docs/config';
import { SwaggerService } from './swagger.service';

describe('SwaggerService', () => {
  let app: INestApplication;
  let swaggerService: SwaggerService;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [SwaggerService],
    }).compile();

    app = testingModule.createNestApplication();
    swaggerService = testingModule.get<SwaggerService>(SwaggerService);
  });

  it('should be defined', () => {
    expect(swaggerService).toBeDefined();
  });

  it('should configure Swagger correctly', () => {
    const swaggerSetupSpy = jest.spyOn(SwaggerModule, 'setup');

    SwaggerService.setup(app, 'api');

    expect(swaggerSetupSpy).toHaveBeenCalledWith(
      `${'api'}${Config.path}`,
      app,
      expect.any(Object),
      expect.objectContaining({
        customSiteTitle: expect.any(String),
      }),
    );
  });
});
