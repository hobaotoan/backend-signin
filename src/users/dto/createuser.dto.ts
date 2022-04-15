import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly username: string;
  @Field()
  readonly password: string;
  @Field()
  readonly email: string;
  @Field()
  readonly phone: string;
}