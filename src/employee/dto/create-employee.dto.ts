import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EmployeeIdDto {
  @ApiProperty({
    description: 'Id of parent Employee',
    example: 1,
  })
  @IsNumber()
  id: number;
}

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'The Name Of the employee',
    example: 'name 1',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Position of the employee',
  })
  @IsOptional()
  positionId?: number;

  @ApiProperty({
    description: 'Position Name Of the employee',
    example: 'CTO',
  })
  @IsString()
  @IsOptional()
  positionName?: string;

  @ApiProperty({
    description: 'Parent Of Employee',
  })
  parent?: EmployeeIdDto;
}
