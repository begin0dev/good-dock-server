import { IsString } from 'class-validator';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: false })
export class Subscribe {
  @Prop({ unique: true, index: true })
  @IsString()
  en: string;

  @Prop({ unique: true, index: true })
  @IsString()
  ko: string;

  @Prop()
  @IsString()
  imageUrl: string;
}

export type SubscribeDocument = Subscribe & Document;
export const SubscribeSchema = SchemaFactory.createForClass(Subscribe);
