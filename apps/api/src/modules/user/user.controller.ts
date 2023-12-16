import { Controller, Get, HttpCode, HttpStatus, Req } from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";
import { User } from "@spendee-clone/common/types";

import { Authorize } from "../../decorators/authorize.decorator";

@SkipThrottle()
@Controller('users')
export class UserController {
  @Get('/me')
  @Authorize()
  @HttpCode(HttpStatus.OK)
  async me(@Req() req: { user: User }) {
    return req.user;
  }
}
