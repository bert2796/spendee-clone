import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategoryDto, DeleteCategoryDto, InitializeUserCategoriesDto, UpdateCategoryDto } from "@spendee-clone/common/dto";
import { CategoryTypes } from "@spendee-clone/common/types";
import { FindOptionsWhere, Repository } from "typeorm";

import { CategoryEntity } from "./category.entity";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  async find(where: FindOptionsWhere<CategoryEntity> | FindOptionsWhere<CategoryEntity>[]): Promise<CategoryEntity[]> {
    return this.categoryRepository.find({
      where,
    });
  }

  async findOne(where: FindOptionsWhere<CategoryEntity> | FindOptionsWhere<CategoryEntity>[]): Promise<CategoryEntity> {
    return this.categoryRepository.findOne({
      where
    });
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const existingCategory = await this.findOne({
      ...createCategoryDto
    });
    if (existingCategory) {
      throw new RpcException({
        code: HttpStatus.BAD_REQUEST,
        message: 'Category already exists.',
      });
    }

    const category = new CategoryEntity();
    category.userId = createCategoryDto.userId;
    category.name = createCategoryDto.name;
    category.type = createCategoryDto.type;

    return this.categoryRepository.save(category);
  }

  async update(updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.findOne({ id: updateCategoryDto.id, userId: updateCategoryDto.userId });
    if (!category) {
      throw new RpcException({
        code: HttpStatus.BAD_REQUEST,
        message: 'Category does not exist.',
      });
    }

    if (category.name === updateCategoryDto.name) {
      return category;
    }

    const categoryWithSameAttributes = await this.findOne({
      ...updateCategoryDto,
      type: category.type,
    });
    if (categoryWithSameAttributes) {
      throw new RpcException({
        code: HttpStatus.BAD_REQUEST,
        message: 'Category already exists.',
      });
    }

    category.name = updateCategoryDto.name;

    return this.categoryRepository.save(category);
  }

  async delete(deleteCategoryDto: DeleteCategoryDto) {
    const category = await this.findOne({ id: deleteCategoryDto.id, userId: deleteCategoryDto.userId });
    if (!category) {
      throw new RpcException({
        code: HttpStatus.BAD_REQUEST,
        message: 'Category does not exist.',
      });
    }

    return this.categoryRepository.remove(category);
  }

  async initializeUserCategories(initializeUserCategoriesDto: InitializeUserCategoriesDto) {
    const { userId } = initializeUserCategoriesDto;
    const incomeCategories = ['Salary', 'Business', 'Parental Leave', 'Loan', 'Insurance Payout', 'Gifts', 'Other'];
    const expenseCategories = [
      'Food & Drinks', 'Shopping', 'Transport', 'Home', 'Bill & Fees', 'Entertainment', 'Health & Fitness', 'Education', 'Gifts & Donations', 'Investments', 'Fees & Charges', 'Taxes', 'Other'];

    return this.categoryRepository.insert([
      ...incomeCategories.map(name => ({ name, type: CategoryTypes.Income, userId })),
      ...expenseCategories.map(name => ({ name, type: CategoryTypes.Expense, userId })),
    ]);
  }
}
