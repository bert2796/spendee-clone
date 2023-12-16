import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Req } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { SkipThrottle } from "@nestjs/throttler";
import { CreateCategoryDto, GetUserCategoriesDto } from "@spendee-clone/common/dto";
import { Category, User } from "@spendee-clone/common/types";
import { catchError, firstValueFrom, throwError, timeout } from "rxjs";

import { Authorize } from "../../decorators/authorize.decorator";

@SkipThrottle()
@Controller('categories')
export class CategoryController {
  constructor(
    @Inject('CATEGORY_SERVICE') private readonly categoryServiceClient: ClientProxy
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
        .send<Category[], GetUserCategoriesDto>({ cmd: 'get-user-categories', role: 'category' }, { userId: req.user.id })
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error))))
    );
  }

  @Post('/')
  @Authorize()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Req() req: { user: User }, @Body() createCategoryDto: Pick<CreateCategoryDto, 'name' | 'type'> ) {
    return firstValueFrom(
      this.categoryServiceClient
        .send<Category, CreateCategoryDto>({ cmd: 'create-category', role: 'category' }, { ...createCategoryDto, userId: req.user.id })
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error))))
    );
  }
}
