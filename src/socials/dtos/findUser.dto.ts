import { IsString } from 'class-validator';

import { TOAuthProvider } from '../../helpers/social-o-auth/o-auth.types';

export class FindUserDto {
  @IsString()
  readonly provider: TOAuthProvider;

  @IsString()
  readonly accessToken: string;
}
