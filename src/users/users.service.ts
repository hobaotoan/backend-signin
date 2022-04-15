import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from './dto/createuser.dto';
import { UserInput } from './input/inputusers.input';
import { User} from './schemas/user.schema';

@Injectable()
export class UsersService {
  find(email: string): User {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: UserInput): Promise<UserType> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<UserType[]> {
    return await this.userModel.find().exec();
  }

  // async findOne(id: string): Promise<UserType> {
  //   return await this.userModel.findOne({ _id: id });
  // }
  async findOne(username: string): Promise<UserType> {
    return await this.userModel.findOne({ username: username }).lean();
  }
  async findUser(username:string, password:string):Promise<any>{
    return await this.userModel.find({username: username,password:password});
  }
  
  async delete(id: string): Promise<UserType> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, user: User): Promise<UserType> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
