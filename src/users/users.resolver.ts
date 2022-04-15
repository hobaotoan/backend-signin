import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserType } from './dto/createuser.dto';
import { UserInput } from './input/inputusers.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GetUserArgs } from './args/get-user.args';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { InputLogin } from 'src/auth/dto/InputLogin';
import { ReponseLogin } from 'src/auth/dto/ReponseLogin';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserType])
  async users(): Promise<UserType[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserInput): Promise<UserType> {
    return this.usersService.create(input);
  }

  @Mutation(() => UserType)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UserInput,
  ): Promise<UserInput> {
    return this.usersService.update(id, input);
  }

  @Mutation(() => UserType)
  async deleteUser(@Args('id') id: string): Promise<UserInput> {
    return this.usersService.delete(id);
  }

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  // @Query(() => UserType)
  // @UseGuards(JwtAuthGuard)
  // async signIn(@CurrentUser() user: User,  @Args('input') getUserArgs: GetUserArgs): Promise<UserType> {
  //     return this.usersService.findUser(getUserArgs.username,getUserArgs.password);
  // }


  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @Query(()=> ReponseLogin)
  @UseGuards(JwtStrategy)
  getProfile(@Args('input') inputLogin: InputLogin , @Context() ctx): Promise<ReponseLogin> {
    console.log(ctx.user)
    return ctx.user;
  }

}
