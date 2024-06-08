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
import { UserRoles } from '../auth/decorators/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Public } from '../auth/decorators/public.decorator';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Employee info')
@Controller('employee-info')
export class EmployeeInfoController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Public()
  @Get('public/:id')
  async empInfoPublic(@Param('id') id: string) {
    return await this.employeeService.empInfo(+id);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
