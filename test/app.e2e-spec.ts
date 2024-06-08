import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserRoles } from '../src/auth/decorators/role.enum';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { UsersModule } from '../src/users/users.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let employeeService = { empInfo: () => [] };
  let id = '1';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'employee',
          entities: [User],
          synchronize: false,
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('<h1>Welcome to the server. Server is running....</h1>');
  });

  const mockUser: User = {
    id: 1,
    name: 'admin',
    phone: '112233',
    email: 'test@test.com',
    role: UserRoles.Admin,
    password: 'Password@123',
    status: false,
    created_at: undefined,
    updated_at: undefined,
  };

  let jwtToken: string = '';

  // describe('Auth', () => {
  // it('(POST) - Register a new user', async () => {
  //   return request(app.getHttpServer())
  //     .post('/auth/create-base-user')
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body.token).toBeDefined();
  //     });
  // });

  //   it('(GET) - Login user', async () => {
  //     return request(app.getHttpServer())
  //     .post('/auth/login')
  //     .send({ email: mockUser.email, password: mockUser.password })
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body.token).toBeDefined();
  //       jwtToken = res.body.token;
  //     });
  //   });
  // });

  // it('(GET) - Login user', async () => {
  //   return request(app.getHttpServer())
  //     .post('/auth/login')
  //     .send({ email: user.email, password: user.password })
  //     .expect(200)
  //     .then((res) => {
  //       expect(res.body.token).toBeDefined();
  //       jwtToken = res.body.token;
  //     });
  // });

  //   it(`/GET employee-info/public`, () => {
  //     return request(app.getHttpServer())
  //         .get('/employee-info/public/' + id)
  //         .expect(200)
  //         .expect({
  //             data: employeeService.empInfo(),
  //         });
  // });
});
