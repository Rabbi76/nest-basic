import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  Length,
} from 'class-validator';
import { UserRoles } from 'src/auth/decorators/role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'The Name Of A User',
    example: 'Mr. XYZ',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'user Phone Number',
    example: '112233',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'User Email Address',
    example: 'test@test.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User Status',
  })
  @IsBoolean()
  status?: boolean;

  @ApiProperty({
    description: 'The password of the User',
    example: 'Password@123',
  })
  @IsNotEmpty()
  @Length(6, 24)
  password: string;

  @ApiProperty({
    description: 'User Role',
    example: 'staff',
  })
  @IsEnum(UserRoles)
  role: UserRoles;
}
