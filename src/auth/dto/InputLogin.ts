import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class InputLogin{
    @Field()
    username: string;

    @Field()
    password: string;
}