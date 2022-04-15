import { Field, ObjectType } from "@nestjs/graphql";
import { User } from './../../users/schemas/user.schema';


@ObjectType()
export class ReponseLogin{
    @Field()
    access_token: string;

    @Field(() => User, {nullable:true})
    user: User;
}