import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/Schema/users';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  generateJwtToken(user: User) {
    throw new Error('Method not implemented.');
  }

  constructor(private readonly jwtService :JwtService,private readonly usersService: UsersService ){}
  


  async validateUser(username: string, password: string): Promise<User | null> {
    // Find the user by username
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return null; // User not found
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null; // Invalid password
    }

    return user; // User is authenticated
  }
  generateToken(payload:User):string{
    return this.jwtService.sign(payload);
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
