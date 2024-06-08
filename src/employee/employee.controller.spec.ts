import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController, EmployeeInfoController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

const mockEmpService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  empInfo: jest.fn(),
};

const dummyEmp = {
  id: 1,
  name: 'Name 1',
  positionId: 1,
  positionName: 'CTO',
} as Employee;

const createEmp = {
  "name": "name 1",
  "positionId": 1,
  "positionName": "CTO",
} as CreateEmployeeDto;


const UpdateEmp = {
  "name": "name 1",
  "positionId": 1,
  "positionName": "CTO",
} as UpdateEmployeeDto;

const id = '1';

const employees = [dummyEmp];

const dummyEmpInfo= [
  {
    "id": 3,
    "name": "name 3",
    "positionId": 3,
    "positionName": "Software eng",
    "child": [
      {
        "id": 4,
        "name": "name 4",
        "positionId": 4,
        "positionName": "Junior software eng",
        "child": []
      }
    ]
  }
];

const mockGuard = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpZCI6Mywicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNzE1OTY5ODMxLCJleHAiOjE3MTU5NzM0MzF9.SBilu3k-vfz0S1JXHvZfUTm9nExuUSmuuNxcVGLhsDg',
};

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let controllerEmpInfo: EmployeeInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController, EmployeeInfoController],
      providers: [
        {
          provide: EmployeeService,
          useValue: mockEmpService,
        },
      ],
    })
    .overrideGuard(AuthGuard)
    .useValue(mockGuard)
    .compile();

    controller = module.get<EmployeeController>(EmployeeController);
    controllerEmpInfo = module.get<EmployeeInfoController>(EmployeeInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => Should create a new employee by a given data', async () => {
    jest.spyOn(mockEmpService, 'create').mockReturnValue(dummyEmp);

    // act
    const result = await controller.create(createEmp);
    // assert
    expect(mockEmpService.create).toHaveBeenCalled();
    expect(mockEmpService.create).toHaveBeenCalledWith(createEmp);

    expect(result).toEqual(dummyEmp);
  });

  it('findAll => Should return an array of employee', async () => {
    jest.spyOn(mockEmpService, 'findAll').mockReturnValue(employees);

    //act
    const result = await controller.findAll();

    // assert
    expect(result).toEqual(employees);
    expect(mockEmpService.findAll).toHaveBeenCalled();
  });

  it('findOne => Should find a employee by a given id and return its data', async () => {
    jest.spyOn(mockEmpService, 'findOne').mockReturnValue(dummyEmp);

    //act
    const result = await controller.findOne(id);
    
    expect(mockEmpService.findOne).toHaveBeenCalled();
    expect(mockEmpService.findOne).toHaveBeenCalledWith(+id);
    
    expect(result).toEqual(dummyEmp);
  });

  it('update => Should find a employee by a given id and update its data', async () => {
    jest.spyOn(mockEmpService, 'update').mockReturnValue(dummyEmp);

    //act
    const result = await controller.update(id, UpdateEmp);

    expect(mockEmpService.update).toHaveBeenCalled();
    expect(mockEmpService.update).toHaveBeenCalledWith(+id, UpdateEmp);

    expect(result).toEqual(dummyEmp);
  });
  it('remove => Should find a employee by a given id, remove and then return Number of affected rows', async () => {
    jest.spyOn(mockEmpService, 'remove').mockReturnValue(dummyEmp);

    //act
    const result = await controller.remove(id);

    expect(mockEmpService.remove).toHaveBeenCalled();
    expect(mockEmpService.remove).toHaveBeenCalledWith(+id);
    
    expect(result).toEqual(dummyEmp);
  });

  it('empInfoPublic => Should find a employee and all children by a given id and then return all the Employee Information (hierarchy by position) under any given position', async () => {
    jest.spyOn(mockEmpService, 'empInfo').mockReturnValue(dummyEmpInfo);

    const result = await controllerEmpInfo.empInfoPublic(id);
    
    expect(result).toEqual(dummyEmpInfo);
  });

  it('empInfo => Should find a employee and all children by a given id and then return all the Employee Information (hierarchy by position) under any given position', async () => {
    jest.spyOn(mockEmpService, 'empInfo').mockReturnValue(dummyEmpInfo);

    //act
    const result = await controllerEmpInfo.empInfo(id);
    
    expect(result).toEqual(dummyEmpInfo);
  });

});
