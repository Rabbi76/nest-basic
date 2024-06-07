import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hash;
    return this.userRepository.save(createUserDto).catch((e) => {
      // console.log(e)
      if (e.code == 'ER_DUP_ENTRY') {
        return {
          statusCode: 'DUPLICATE_VALUE',
          message: e.sqlMessage,
        };
      } else {
        console.log(e);
        return {
          statusCode: 'UNKNOWN_ERROR',
          details: e,
        };
      }
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.getUserInfo(id, true);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hash = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hash;
    }
    await this.userRepository.update(id, updateUserDto);

    return await this.getUserInfo(id);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async getUserInfo(id: number, rel: boolean = false): Promise<User> {
    let relation = [];
    if (rel) {
      relation = [];
    }

    const userInfo: User = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: relation,
    });

    if (userInfo) {
      return userInfo;
    }

    throw new HttpException('User  not found', HttpStatus.NOT_FOUND);
  }

  async findOneByEmail(email: string) {
    const userInfo = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    return userInfo;
  }
}
