import { Dayjs } from 'dayjs';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsString, IsOptional } from 'class-validator';

import { User } from './user.schema';

@Schema({ timestamps: false })
export class UserToSubscribe {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, index: true })
  user: User;

  @Prop({ type: Date, index: true })
  @IsDate()
  startDate: Date | Dayjs;

  @Prop({ type: Date, sparse: true, index: true })
  @IsDate()
  @IsOptional()
  endDate?: Date | Dayjs;

  @Prop({ type: String, index: true })
  @IsString()
  ko: string;

  @Prop({ type: String })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}

export type UserToSubscribeDocument = UserToSubscribe & Document;
export const UserToSubscribeSchema = SchemaFactory.createForClass(UserToSubscribe);
