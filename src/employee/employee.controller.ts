import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRoles } from 'src/auth/decorators/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Employee info')
@Controller('employee-info')
export class EmployeeInfoController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Public()
  @Get('public/:id')
  empInfoPublic(@Param('id') id: string) {
    return this.employeeService.empInfo(+id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRoles.Admin, UserRoles.Staff)
  @ApiBearerAuth('bearer')
  @Get(':id')
  empInfo(@Param('id') id: string) {
    return this.employeeService.empInfo(+id);
  }

}

@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
@Roles(UserRoles.Admin, UserRoles.Staff)
@ApiBearerAuth('bearer')
@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }


  @Get()
  findAll() {
    return this.employeeService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }


  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }


  @Roles(UserRoles.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}

