import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeePositionDto {
    @ApiProperty({
        description: 'The Position',
        example: 'Mr. XYZ',
      })
      @IsNotEmpty()
      @IsString()
      name: string;
}
