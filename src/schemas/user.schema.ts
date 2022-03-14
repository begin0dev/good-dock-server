import { Document } from 'mongoose';
import { Optional } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, Length } from 'class-validator';

@Schema({ timestamps: true })
export class User {
  @IsString()
  @Length(1, 25)
  @Prop({ required: true })
  displayName: string;

  @IsString()
  @Prop({ required: true })
  provider: string;

  @IsString()
  @Prop({ required: true })
  providerId: string;

  @IsString()
  @Optional()
  @Prop({ sparse: true, unique: true, index: true })
  refreshToken?: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ provider: 1, providerId: 1 }, { unique: true });
