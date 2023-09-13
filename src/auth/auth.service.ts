import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/Schema/users';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  generateJwtToken(user: User) {
    throw new Error('Method not implemented.');
  }

  constructor( @InjectModel (User.name) private userModel: Model<User>,
  private jwtSerrvice: JwtService ){}
  // readonly jwtService :JwtService,private readonly usersService: UsersService
  

   async signUp(signUpDto: SignUpDto): Promise <{token:string}> {
    const {username, email, phone, address, password,role}=signUpDto

    const hashedPassword = await bcrypt.hash(password,10)
    const user = await this.userModel.create({
      username,
      email,
      phone,
      address,
      password,
      role
    })

    const token = this.jwtSerrvice.sign({id: user._id});
   
    return {token};
  
  }
async login(loginDto: LoginDto): Promise <{token : string}>{
  const {email,password} = loginDto;

  const user = await this.userModel.findOne({email})

  if(!user){
    throw new UnauthorizedException('Invalid email or password')
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password)

  if(!isPasswordMatched){
    throw new UnauthorizedException('invalid email or password')
  }
  const token = this.jwtSerrvice.sign({id: user._id});
   
    return {token};
}}

  // async validateUser(username: string, password: string): Promise<User | null> {
  //   // Find the user by username
  //   const user = await this.usersService.findByUsername(username);

  //   if (!user) {
  //     return null; // User not found
  //   }

  //   // Compare the provided password with the hashed password in the database
  //   const isPasswordValid = await bcrypt.compare(password, user.password);

  //   if (!isPasswordValid) {
  //     return null; // Invalid password
  //   }

  //   return user; // User is authenticated
  // }
  // generateToken(payload:User):string{
  //   return this.jwtService.sign(payload);
  // }
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

