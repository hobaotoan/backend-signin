import { ReponseLogin } from './dto/ReponseLogin';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UserType } from 'src/users/dto/createuser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      const {access_token} = await this.login(user)
      return {access_token,user:result};
    }
    return null;
  }

  async login(user: UserType) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
  // async verifine(user : ReponseLogin):Promise<any>{
  //   const token = { access_token : user.access_token}
  //   return {
      
  //   }
  // }
}
