import { Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';

@Controller()
@ApiBearerAuth()
export class AppController {
  constructor(private readonly authService: AuthService) {}


  @Post('/login')
  @UseGuards(AuthGuard("local"))
  @ApiBody({
    schema:{
      type: 'object',
      properties:{
     
        name:{
          type:'string',
          example: 'User2', 
        },
        password:{
          type:'string',
          example: 'malik7890', 
        },
        
        
        }}})
  login(@Request()req ):string {

    return this.authService.generateToken(req.user);
   
  }

 @Get( "/admin")
 @UseGuards(AuthGuard("jwt"))
 admins(@Request()req) : string{
  return  "THIS IS ADMIN " + JSON.stringify (req.user);
 }

//  @Get( "/user")
//  @UseGuards(AuthGuard("jwt"))
//  users() : string{
//   return "this is user";
//  }
}
