import { Expose } from 'class-transformer';

export class BaseSerializer {
  @Expose()
  id: string;
}
