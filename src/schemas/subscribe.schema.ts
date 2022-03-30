import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: false })
export class Subscribe {
  @IsString()
  @Prop({ unique: true, index: true })
  en: string;

  @IsString()
  @Prop({ unique: true, index: true })
  ko: string;

  @IsString()
  @Prop()
  imageUrl: string;
}

export type SubscribeDocument = Subscribe & Document;
export const SubscribeSchema = SchemaFactory.createForClass(Subscribe);
