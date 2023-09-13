import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/users/role.guard';
import { CONSTANTS } from 'constant';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('Authentication')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService, ) {}

 
  @Post('/signup')

  @ApiBody({
    schema:{
      type: 'object',
      properties:{
       
          
        username:{
          type:'string',
          example: 'ali', 
        },
        email:{
          type:'string',
          example: 'admin', 
        },
       
        phone:{
          type:'string',
          example: '0234443', 
        },
        address:{
          type:'string',
          example: 'i8/2', 
        },
        password:{
          type:'string',
          example: 'malik7890', 
        },
        role:{
          type:'string',
          example: 'admin', 
        },
     
        
        
        
        
        }}})
       signUp(@Body() signUpDto: SignUpDto): Promise<{token :string}>{
        return this.authService.signUp(signUpDto);
       }


       @Get('/login')

      // //  @ApiBody({
      // //    schema:{
      // //      type: 'object',
      // //      properties:{
            
               
            
      // //        email:{
      // //          type:'string',
      // //          example: 'admin', 
      // //        },
            
          
      // //        password:{
      // //          type:'string',
      // //          example: 'malik7890', 
      // //        },
             
          
             
      //        }}})
            loginUp(@Body() loginDto: LoginDto): Promise<{token :string}>{
             return this.authService.login(loginDto);
            }
  }

//   @Get( "/admin")
//   @UseGuards(AuthGuard("jwt") , new RoleGuard (CONSTANTS.ROLES.ADMIN))
//   admin(@Request()req) : string{
//    return  "THIS IS ADMIN " + JSON.stringify (req.user);
//   }
 
//   @Get( "/user")
//   @UseGuards(AuthGuard("jwt"),new RoleGuard (CONSTANTS.ROLES.USER))
//   user(@Request()req) : string{
//    return  "THIS IS USER " + JSON.stringify (req.user);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
//     return this.authService.update(+id, updateAuthDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.authService.remove(+id);
//   }
// }


