import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateUserToSubscribeDto {
  @Type(() => Date)
  @Transform(({ value }) => dayjs(value).startOf('D'), { toClassOnly: true })
  @IsDate()
  startDate: Date | Dayjs;

  @Type(() => Date)
  @Transform(({ value }) => (value ? dayjs(value).endOf('D') : value), { toClassOnly: true })
  @IsDate()
  @IsOptional()
  endDate?: Date | Dayjs;

  @IsString()
  ko: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
