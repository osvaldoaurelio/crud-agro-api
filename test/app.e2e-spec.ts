import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/producers (GET)', () => {
    return request(app.getHttpServer())
      .get('/producers')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(Array.isArray(response.body.data)).toBe(true);
      });
  });

  it('/producers/:id (GET)', () => {
    const producerId = 'some-valid-id';
    return request(app.getHttpServer())
      .get(`/producers/${producerId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body).toHaveProperty('id', producerId);
      });
  });

  it('/producers (POST)', () => {
    const newProducer = {
      fullName: 'New Producer',
      cpfOrCnpj: '12345678901',
      properties: [],
    };
    return request(app.getHttpServer())
      .post('/producers')
      .send(newProducer)
      .expect(201)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('fullName', newProducer.fullName);
      });
  });

  it('/producers/:id (PATCH)', () => {
    const producerId = 'some-valid-id';
    const updateData = {
      fullName: 'Updated Producer Name',
    };
    return request(app.getHttpServer())
      .patch(`/producers/${producerId}`)
      .send(updateData)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body).toHaveProperty('id', producerId);
        expect(response.body).toHaveProperty('fullName', updateData.fullName);
      });
  });

  it('/producers/:id (DELETE)', () => {
    const producerId = 'some-valid-id';
    return request(app.getHttpServer())
      .delete(`/producers/${producerId}`)
      .expect(204);
  });
});
