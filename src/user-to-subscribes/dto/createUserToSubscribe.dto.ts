import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

import { IsDayjs } from '../../decorators/validator.decorator';

export class CreateUserToSubscribeDto {
  @IsString()
  type: 'subscribe' | 'fixed';

  @Type(() => Dayjs)
  @Transform(({ value }) => dayjs(value).startOf('D'), { toClassOnly: true })
  @IsDayjs()
  startDate: Dayjs;

  @Type(() => Dayjs)
  @Transform(({ value }) => dayjs(value).endOf('D'), { toClassOnly: true })
  @IsDayjs()
  @IsOptional()
  endDate: Dayjs;

  @IsString()
  ko: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  period: number;

  @IsString()
  unit: 'day' | 'week' | 'month' | 'year';

  @IsString()
  @IsOptional()
  memo?: string;
}
