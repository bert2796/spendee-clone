import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { GetUserCategoriesDto, InitializeUserCategoriesDto } from "@spendee-clone/common/dto";

import { CategoryService } from "./category.service";

@Controller()
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @EventPattern('user-created')
  async initializeCategories(initializeUserCategoriesDto: InitializeUserCategoriesDto) {
    return this.categoryService.initializeUserCategories(initializeUserCategoriesDto);
  }

  @MessagePattern({ cmd: 'get-user-categories', role: 'category' })
  async getWallets(getUserCategoriesDto: GetUserCategoriesDto) {
    const { userId } = getUserCategoriesDto;

    return this.categoryService.find({ userId });
  }
}
