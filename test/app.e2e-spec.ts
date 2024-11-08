import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jwtService = app.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/products (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/products/:id (GET)', async () => {
    const existingProductId = '3a962cb2-ac96-4cff-b870-2350d5bc8f29';

    const response = await request(app.getHttpServer())
      .get(`/products/${existingProductId}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.id).toEqual(existingProductId);
  });

  it('/categories (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/categories')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/auth/signin (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'jmoncada@gmail.com', password: 'Juli123.' })
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.accessToken).toBeDefined();
  });

  it('/orders/:id (GET)', async () => {
    const existingOrderId = 'a4cc431e-2eff-44d7-929c-cc5c6ec3b0ca';

    const token = jwtService.sign({
      userId: 'f8eaaf77-0f15-42b7-855e-bc512f85d6f0',
      email: 'jmoncada@gmail.com',
      roles: ['Admin'],
    });

    const response = await request(app.getHttpServer())
      .get(`/orders/${existingOrderId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.id).toEqual(existingOrderId);
  });
});
