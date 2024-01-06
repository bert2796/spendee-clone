import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SkipThrottle } from '@nestjs/throttler';
import {
  APICreateCategoryDto,
  APIUpdateCategoryDto,
  CreateCategoryDto,
  DeleteCategoryDto,
  GetUserCategoriesDto,
  UpdateCategoryDto,
} from '@spendee-clone/common/dto';
import { Category, User } from '@spendee-clone/common/types';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';

import { Authorize } from '../../decorators/authorize.decorator';

@SkipThrottle()
@Controller('categories')
export class CategoryController {
  constructor(
    @Inject('CATEGORY_SERVICE')
    private readonly categoryServiceClient: ClientProxy,
  ) {}

  @Get('/health')
  healthCheck() {
    return this.categoryServiceClient.send({ cmd: 'health' }, '');
  }

  @Get('/')
  @Authorize()
  @HttpCode(HttpStatus.OK)
  async getUserWallets(@Req() req: { user: User }) {
    return firstValueFrom(
      this.categoryServiceClient
        .send<Category[], GetUserCategoriesDto>(
          { cmd: 'get-user-categories', role: 'category' },
          { userId: req.user.id },
        )
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Post('/')
  @Authorize()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(
    @Req() req: { user: User },
    @Body() createCategoryDto: APICreateCategoryDto,
  ) {
    return firstValueFrom(
      this.categoryServiceClient
        .send<Category, CreateCategoryDto>(
          { cmd: 'create-category', role: 'category' },
          { ...createCategoryDto, userId: req.user.id },
        )
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Patch('/:id')
  @Authorize()
  @HttpCode(HttpStatus.OK)
  async updateCategory(
    @Req() req: { user: User },
    @Param('id') id: number,
    @Body() updateCategoryDto: APIUpdateCategoryDto,
  ) {
    return firstValueFrom(
      this.categoryServiceClient
        .send<Category, UpdateCategoryDto>(
          { cmd: 'update-category', role: 'category' },
          { ...updateCategoryDto, id, userId: req.user.id },
        )
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Delete('/:id')
  @Authorize()
  @HttpCode(HttpStatus.OK)
  async deleteCategory(@Req() req: { user: User }, @Param('id') id: number) {
    return firstValueFrom(
      this.categoryServiceClient
        .send<Category, DeleteCategoryDto>(
          { cmd: 'delete-category', role: 'category' },
          { id, userId: req.user.id },
        )
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }
}
