import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { EmployeePosition } from "src/employee-position/entities/employee-position.entity";

export class EmployeeIdDto {
    @IsNumber()
    id: number;
}

export class CreateEmployeeDto {
    @ApiProperty({
        description: 'The Name Of A User',
        example: 'Mr. XYZ',
      })
      @IsNotEmpty()
      @IsString()
      name: string;

      @ApiProperty({
        description: 'Position of the employee',
      })
      @IsNotEmpty()
      position: EmployeePosition;

      @ApiProperty({
        description: 'Parent Of Employee',
      })
      parent?: EmployeeIdDto;
}

