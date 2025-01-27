import { Module } from '@nestjs/common';
import { PlantingService } from './planting.service';
import { PlantingController } from './planting.controller';

@Module({
  controllers: [PlantingController],
  providers: [PlantingService],
})
export class PlantingModule {}
