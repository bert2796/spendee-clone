import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoginAuthDto, RegisterAuthDto } from '@spendee-clone/common/dto';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'validate-token', role: 'auth' })
  async validateToken(token: string) {
    return this.authService.validateToken(token);
  }

  @MessagePattern({ cmd: 'login', role: 'auth' })
  async login(loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @MessagePattern({ cmd: 'register', role: 'auth' })
  async register(registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }
}
