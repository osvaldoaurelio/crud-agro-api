import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { cpf } from 'cpf-cnpj-validator';

describe('AppController (e2e)', () => {
  const validCpf = cpf.generate();

  let app: INestApplication;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/producers (GET)', () => {
    const producerRequest = {
      fullName: 'Producer Name',
      cpfOrCnpj: validCpf,
    };

    const producerResponse = {
      id: expect.any(String),
      ...producerRequest,
      cpfOrCnpj: cpf.format(validCpf),
      properties: [],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };

    return request(app.getHttpServer())
      .post('/producers')
      .send(producerRequest)
      .expect(201)
      .expect((response) => {
        expect(response.body).toEqual(producerResponse);
      });
  });
});
