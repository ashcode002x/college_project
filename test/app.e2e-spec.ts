import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('App E2E Tests', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/college_data/:college_id (GET)', () => {
    return request(app.getHttpServer())
      .get('/college_data/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('avg_section');
        expect(res.body).toHaveProperty('placement_section');
      });
  });

  it('/college_courses/:college_id (GET)', () => {
    return request(app.getHttpServer())
      .get('/college_courses/1')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/colleges (GET)', () => {
    return request(app.getHttpServer())
      .get('/colleges?city=SomeCity')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});