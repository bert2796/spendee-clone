import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoginAuthDto, RegisterAuthDto } from "@spendee-clone/common/dto";

import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Get('/health')
  healthCheck() {
    return this.authService.healthCheck();
  }

  @Post('/login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('/register')
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }
}
