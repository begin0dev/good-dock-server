import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchDto {
  @IsString()
  @IsOptional()
  public keyword?: string;

  @IsString()
  @IsOptional()
  public after?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  public limit?: number;
}
