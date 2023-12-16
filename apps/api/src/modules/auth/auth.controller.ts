import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoginAuthDto, RegisterAuthDto } from "@spendee-clone/common/dto";

import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Get('/auth/health')
  healthCheck() {
    return this.authService.healthCheck();
  }

  @Post('/auth/login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('/auth/register')
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }
}
