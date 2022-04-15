import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
@ObjectType()

export class User {

  @Prop({unique: true})
  @Field()
  username: string;

  @Prop()
  @Field()
  password: string;

  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);