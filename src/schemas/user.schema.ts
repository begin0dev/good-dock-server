import { Document } from 'mongoose';
import { Optional } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, Length } from 'class-validator';

import mongooseDelete = require('mongoose-delete');

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  @IsString()
  @Length(1, 25)
  displayName: string;

  @Prop({ required: true })
  @IsString()
  provider: string;

  @Prop({ required: true })
  @IsString()
  providerId: string;

  @Prop({ sparse: true, unique: true, index: true })
  @IsString()
  @Optional()
  refreshToken?: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ provider: 1, providerId: 1 }, { unique: true });
UserSchema.plugin(mongooseDelete, { deletedAt: true });
