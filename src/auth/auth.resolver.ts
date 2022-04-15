// import { UseGuards } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserType } from "src/users/dto/createuser.dto";
import { User } from "src/users/schemas/user.schema";
// import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { InputLogin } from "./dto/InputLogin";
import { ReponseLogin } from "./dto/ReponseLogin";
import { GqlAuthGuard } from "./gql-auth.guard";
// import { InputLogin } from "./dto/InputLogin";
// import { ReponseLogin } from "./dto/ReponseLogin";
// import { GqlAuthGuard } from "./gql-auth.guard";


@Resolver()
export class AuthResolver {
    usersService: any;
    constructor(
        private authService: AuthService
    ){}

    @Mutation(() => ReponseLogin)
    @UseGuards(GqlAuthGuard)
    async logIn(@Args('input') inputLogin: InputLogin, @Context() context): Promise<ReponseLogin>{
        // console.log(context);
        return context.user
    }

    @Query(() => UserType)
    @UseGuards(GqlAuthGuard)
    whoAmI(@CurrentUser() user: UserType, @Context() context) {
        // console.log(context);
      return this.usersService.findById(user.id);
    }
}
