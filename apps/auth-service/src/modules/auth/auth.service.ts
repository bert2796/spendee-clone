import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RpcException } from "@nestjs/microservices";
import { LoginAuthDto, RegisterAuthDto } from "@spendee-clone/common/dto";

import { UserEntity } from "../user/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCredentials(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const user = await this.userService.findOneWithPassword({ email });
    if (!user) {
      throw new RpcException({
        code: HttpStatus.BAD_REQUEST,
        message: 'User does not exists.',
      });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new RpcException({
        code: HttpStatus.BAD_REQUEST,
        message: 'User does not exists.',
      });
    }

    return user;
  }

  async validateToken(token: string) {
    const { id } = await this.jwtService.verifyAsync(token);

    const user = await this.userService.findOne({ id });
    if (!user) {
      throw new RpcException({
        code: HttpStatus.BAD_REQUEST,
        message: 'User does not exists.',
      });
    }

    return user;
  }

  async login(loginAuthDto: LoginAuthDto) {
    let user: UserEntity;

    try {
      user = await this.validateCredentials(loginAuthDto);
    } catch (error) {
      this.logger.warn(`Login attempt failed: ${error.message}`);

      throw error;
    }

    const accessToken = await this.jwtService.signAsync({ id: user.id });

    return { accessToken };
  }

  async register(registerAuthDto: RegisterAuthDto) {
    let user: UserEntity;

    try {
      user = await this.userService.create(registerAuthDto);
    } catch (error) {
      this.logger.warn(`Register attempt failed: ${error.message}`);

      throw error;
    }

    const accessToken = await this.jwtService.signAsync({ id: user.id });

    return { accessToken };
  }
}
