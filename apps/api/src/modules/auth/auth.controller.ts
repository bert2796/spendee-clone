import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller()
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy
  ) {}

  @Get('/auth/health')
  healthCheck() {
    return this.authServiceClient.send({ cmd: 'health' }, '');
  }
}
