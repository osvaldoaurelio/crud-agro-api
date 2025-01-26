import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/modules/prisma/prisma.module';
import { SwaggerModule } from './common/modules/swagger/swagger.module';
import { ProducerModule } from './domain/producer/producer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    SwaggerModule,
    ProducerModule,
  ],
})
export class AppModule {}
