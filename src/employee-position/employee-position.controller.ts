import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeePositionService } from './employee-position.service';
import { CreateEmployeePositionDto } from './dto/create-employee-position.dto';
import { UpdateEmployeePositionDto } from './dto/update-employee-position.dto';

@Controller('employee-position')
export class EmployeePositionController {
  constructor(private readonly employeePositionService: EmployeePositionService) {}

  @Post()
  create(@Body() createEmployeePositionDto: CreateEmployeePositionDto) {
    return this.employeePositionService.create(createEmployeePositionDto);
  }

  @Get()
  findAll() {
    return this.employeePositionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeePositionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeePositionDto: UpdateEmployeePositionDto) {
    return this.employeePositionService.update(+id, updateEmployeePositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeePositionService.remove(+id);
  }
}
