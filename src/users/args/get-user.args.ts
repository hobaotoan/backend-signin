import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@ArgsType()
export class GetUserArgs {
    @Field()
    username: string;

    @Field()
    @IsNotEmpty()
    password: string;
}