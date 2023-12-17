import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { CreateCategoryDto, DeleteCategoryDto, GetUserCategoriesDto, GetUserCategoryDto, InitializeUserCategoriesDto,UpdateCategoryDto } from "@spendee-clone/common/dto";

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

  @MessagePattern({ cmd: 'create-category', role: 'category' })
  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @MessagePattern({ cmd: 'update-category', role: 'category' })
  async update(updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(updateCategoryDto);
  }

  @MessagePattern({ cmd: 'delete-category', role: 'category' })
  async delete(deleteCategoryDto: DeleteCategoryDto) {
    return this.categoryService.delete(deleteCategoryDto);
  }

  @MessagePattern({ cmd: 'get-user-category', role: 'category' })
  async getUserCategory(getUserCategoryDto: GetUserCategoryDto) {
    const { userId, id } = getUserCategoryDto;

    return this.categoryService.findOne({ id, userId });
  }
}
