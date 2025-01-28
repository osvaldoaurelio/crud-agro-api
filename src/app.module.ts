import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/modules/prisma/prisma.module';
import { SwaggerModule } from './common/modules/swagger/swagger.module';
import { ProducerModule } from './domain/producer/producer.module';
import { PropertyModule } from './domain/property/property.module';
import { PlantingModule } from './domain/planting/planting.module';
import { LoggerModule } from './common/modules/logger/logger.module';
import { LoggerService } from './common/modules/logger/logger.service';

@Module({
  providers: [LoggerService],
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    SwaggerModule,
    ProducerModule,
    PropertyModule,
    PlantingModule,
    LoggerModule,
  ],
})
export class AppModule {
  constructor(private readonly logger: LoggerService) {}

  onModuleInit() {
    this.logger.log('NestJS Logger initialized');
  }
}
