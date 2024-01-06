import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_SERVICE')
    private readonly categoryServiceClient: ClientProxy,
  ) {}

  async initializeUserCategories(userId: number) {
    return this.categoryServiceClient.emit('user-created', { userId });
  }
}
