import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../src/employee/entities/employee.entity';
import { typeOrmAsyncConfig } from '../src/config/typeorm.config';
import { EmployeeModule } from '../src/employee/employee.module';
import { Repository } from 'typeorm';

let employeeService = { empInfo: () => [] };
let id = '1';
let repository: Repository<Employee>;

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        EmployeeModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
          username: process.env.DB_USERNAME,
          database: process.env.DB_NAME,
          password: process.env.DB_PASSWORD || '',
          entities: [Employee],
          synchronize: false,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    repository = moduleFixture.get('EmployeeRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  //   beforeAll(() => {

  //   })

  it(`/GET employee-info/public`, () => {
    return request(app.getHttpServer())
      .get('/employee-info/public/' + id)
      .expect(200)
      .expect({
        data: employeeService.empInfo(),
      });
  });
});
