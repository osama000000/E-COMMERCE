import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './Schema/users';
import { Model } from 'mongoose';
import { CONSTANTS } from 'constant';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  // public users: User[] = [
  //   {

  //     username: 'admin',
  //     password: '1234',
  //     email: 'abc@.com',
  //     phone: '0342-232323',
  //     address: 'i-10/2',
  //     role:CONSTANTS.ROLES.ADMIN
     
  //   },
  //   {

  //     username: 'user',
  //     password: '123',
  //     email: 'abc@.com',
  //     phone: '0342-22433',
  //     address: 'i-10/2',
  //     role:CONSTANTS.ROLES.USER
   

  //   },

  // ];

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
  create(createUserDto: CreateUserDto): Promise<User> {
    const model = new this.userModel();
    model.username = createUserDto.username;
    model.email = createUserDto.email;
    model.phone = createUserDto.phone;
    model.address = createUserDto.address;
    model.password = createUserDto.password;
    
    return model.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, {
      username: updateUserDto.username,
      email: updateUserDto.email,
      phone: updateUserDto.phone,
      address: updateUserDto.email,
      password: updateUserDto.password,

    })
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
