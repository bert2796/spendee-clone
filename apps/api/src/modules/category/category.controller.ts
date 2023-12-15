import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller()
export class CategoryController {
  constructor(
    @Inject('CATEGORY_SERVICE') private readonly categoryServiceClient: ClientProxy
  ) {}

  @Get('/categories/health')
  healthCheck() {
    return this.categoryServiceClient.send({ cmd: 'health' }, '');
  }
}
