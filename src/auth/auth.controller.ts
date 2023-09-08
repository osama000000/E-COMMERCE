import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/users/role.guard';
import { CONSTANTS } from 'constant';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Authentication')
@Controller('Authentication')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService,  private readonly usersService: UsersService,
    private readonly jwtService: JwtService,) {}

 
  @Post('/login/user')
  @UseGuards(AuthGuard("local"))
  @ApiBody({
    schema:{
      type: 'object',
      properties:{
     
        username:{
          type:'string',
          example: 'admin', 
        },
        password:{
          type:'string',
          example: 'malik7890', 
        },
        
        
        }}})
        async login(@Body() body: { username: string; password: string }) {
          const { username, password } = body;
          const user = await this.authService.validateUser(username, password);
        
          if (!user) {
            // Handle authentication failure
            return { message: 'Invalid credentials' };
          }
        
           // Generate and return a token for successful login
  const token = this.authService.generateJwtToken(user); // You can use your token generation logic here
        
          return { access_token: token };
  // login(@Request()req ):string {

  //   return this.authService.generateToken(req.user);
   
  }
  @Get( "/admin")
  @UseGuards(AuthGuard("jwt") , new RoleGuard (CONSTANTS.ROLES.ADMIN))
  admin(@Request()req) : string{
   return  "THIS IS ADMIN " + JSON.stringify (req.user);
  }
 
  @Get( "/user")
  @UseGuards(AuthGuard("jwt"),new RoleGuard (CONSTANTS.ROLES.USER))
  user(@Request()req) : string{
   return  "THIS IS USER " + JSON.stringify (req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}


