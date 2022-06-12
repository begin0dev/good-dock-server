import { IsString } from 'class-validator';

export class FindByMonthDto {
  @IsString()
  type: 'subscribe' | 'fixed';

  @IsString()
  date: string;
}
