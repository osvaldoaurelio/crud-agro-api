import { Test, TestingModule } from '@nestjs/testing';
import { PlantingController } from './planting.controller';
import { PlantingService } from './planting.service';

describe('PlantingController', () => {
  let controller: PlantingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantingController],
      providers: [PlantingService],
    }).compile();

    controller = module.get<PlantingController>(PlantingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
