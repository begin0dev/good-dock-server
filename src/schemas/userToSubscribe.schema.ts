import { Dayjs } from 'dayjs';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

import { User } from './user.schema';

@Schema({ timestamps: false })
export class UserToSubscribe {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, index: true })
  user: User;

  @Prop({ type: String, index: true })
  @IsString()
  type: 'subscribe' | 'fixed';

  @Prop({ type: Date, index: true })
  startDate: Date | Dayjs;

  @Prop({ type: Date, sparse: true, index: true })
  @IsOptional()
  endDate?: Date | Dayjs;

  @Prop({ type: String, index: true })
  @IsString()
  ko: string;

  @Prop({ type: String })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @Prop({ type: Number })
  @IsInt()
  @Min(0)
  price: number;

  @Prop({ type: Number })
  @IsInt()
  @Min(0)
  period: number;

  @Prop({ type: String })
  @IsString()
  unit: 'day' | 'week' | 'month' | 'year';

  @Prop({ type: String })
  @IsString()
  @IsOptional()
  memo?: string;
}

export type UserToSubscribeDocument = UserToSubscribe & Document;
export const UserToSubscribeSchema = SchemaFactory.createForClass(UserToSubscribe);
