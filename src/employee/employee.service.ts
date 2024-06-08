import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, TreeRepository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Employee)
    private employeeTreeRepository: TreeRepository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.save(createEmployeeDto);
  }

  findAll() {
    return this.employeeRepository.find();
  }

  async findOne(id: number) {
    return await this.getEmpPositionInfo(id, true);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return await this.getEmpPositionInfo(id, true);
  }

  remove(id: number) {
    return this.employeeRepository.delete(id);
  }

  async getEmpPositionInfo(
    id: number,
    rel: boolean = false,
  ): Promise<Employee | any> {
    let relation = [];
    if (rel) {
      relation = ['child'];
    }

    const employeeInfo: Employee = await this.employeeRepository.findOne({
      where: {
        id: id,
      },
      relations: relation,
    });
    if (employeeInfo) {
      return employeeInfo;
    } else {
      return {};
    }
  }

  async empInfo(id: number) {
    const emp = await this.getEmpPositionInfo(id, false);

    if (emp?.id) {
      const data = await this.employeeTreeRepository.findDescendantsTree(emp);
      return data?.child;
    } else {
      return [];
    }
  }
}
