import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  EmployeeController,
  EmployeeInfoController,
} from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController, EmployeeInfoController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
