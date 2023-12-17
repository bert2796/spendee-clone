import { Controller, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { GetUserCategoryDto } from "@spendee-clone/common/dto";
import { Category } from "@spendee-clone/common/types";
import { catchError, firstValueFrom, throwError, timeout } from "rxjs";

@Controller()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_SERVICE') private readonly categoryServiceClient: ClientProxy
  ) {}

  async getUserCategory(getUserCategoryDto: GetUserCategoryDto) {
    return firstValueFrom(this.categoryServiceClient
        .send<Category, GetUserCategoryDto>({ cmd: 'get-user-category', role: 'category' }, getUserCategoryDto)
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error)))));
  }
}
