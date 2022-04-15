import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  readonly username: string;
  @Field()
  readonly password: string;
  @Field()
  readonly email: string;
  @Field()
  readonly phone: string;
}