import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

const mockEmpRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  getEmpInfo: jest.fn(),
};

const dummyEmp = {
  id: 1,
  name: 'Name 1',
  positionId: 1,
  positionName: 'CTO',
} as Employee;

const createEmp = {
  "name": "name 1",
  "positionId": 0,
  "positionName": "CTO",
} as CreateEmployeeDto;

const id = 1;

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
describe('EmployeeService', () => {
  let service: EmployeeService;
  beforeEach(() => jest.resetAllMocks())
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockEmpRepository,
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });


  it('create => Should create a new Employee and return its data', async () => {
    jest.spyOn(mockEmpRepository, 'save').mockReturnValue(dummyEmp);

    const result = await service.create(createEmp);

    expect(mockEmpRepository.save).toHaveBeenCalled();
    expect(mockEmpRepository.save).toHaveBeenCalledWith(createEmp);

    expect(result).toEqual(dummyEmp);
  });

  it('findAll => Should return an array of employee', async () => {
    //arrange

   
    jest.spyOn(mockEmpRepository, 'find').mockReturnValue(employees);

    const result = await service.findAll();

    expect(mockEmpRepository.find).toHaveBeenCalled();

    expect(result).toEqual(employees);
  });

  it('findOne => Should find a employee by a given id and return its data', async () => {
    jest.spyOn(mockEmpRepository, 'findOne').mockReturnValue(dummyEmp);


    const result = await service.findOne(id);

    expect(mockEmpRepository.findOne).toHaveBeenCalled();
    
    expect(result).toEqual(dummyEmp);
  });

  it('remove => Should find a employee by a given id, remove and then return Number of affected rows', async () => {
    jest.spyOn(mockEmpRepository, 'delete').mockReturnValue(dummyEmp);


    const result = await service.remove(id);

    expect(mockEmpRepository.delete).toHaveBeenCalled();
    expect(mockEmpRepository.delete).toHaveBeenCalledWith(id);
    
    expect(result).toEqual(dummyEmp);
  });

  
  it('empInfo => Should find a employee and all children by a given id and then return all the Employee Information (hierarchy by position) under any given position', async () => {
    jest.spyOn(mockEmpRepository, 'getEmpInfo').mockResolvedValue(dummyEmpInfo);


    const result = await service.empInfo(id);

    expect(result).toEqual([]);
  });

});
