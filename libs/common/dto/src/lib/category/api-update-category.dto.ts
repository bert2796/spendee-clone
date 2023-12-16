import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class APIUpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name!: string;
}
