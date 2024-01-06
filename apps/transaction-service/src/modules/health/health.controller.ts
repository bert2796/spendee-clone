import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class HealthController {
  @MessagePattern({ cmd: 'health' })
  healthCheck() {
    return 'OK';
  }
}
