import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategoryDto, InitializeUserCategoriesDto } from "@spendee-clone/common/dto";
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

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const existingCategory = await this.find({
      ...createCategoryDto
    });
    if (existingCategory.length) {
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
