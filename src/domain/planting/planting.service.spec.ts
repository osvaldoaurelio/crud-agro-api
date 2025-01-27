import { Test, TestingModule } from '@nestjs/testing';
import { PlantingService } from './planting.service';

describe('PlantingService', () => {
  let service: PlantingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantingService],
    }).compile();

    service = module.get<PlantingService>(PlantingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
