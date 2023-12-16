import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "@spendee-clone/common/dto";
import { FindOptionsWhere, Repository } from "typeorm";

import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
  ) {}

  async findOneWithPassword(where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[]): Promise<UserEntity> {
    return this.userRepository.findOne({
      select: ['id', 'name', 'email', 'password'],
      where
    });
  }

  async findOne(where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[]): Promise<UserEntity> {
    return this.userRepository.findOne({
      where
    });
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new RpcException({
        code: HttpStatus.BAD_REQUEST,
        message: 'User already exists.',
      });
    }

    const user = new UserEntity();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return this.userRepository.save(user);
  }
}
