import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Authorize = (): CustomDecorator<string> =>
  SetMetadata('authorize', true);
