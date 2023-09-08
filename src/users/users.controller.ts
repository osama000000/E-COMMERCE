import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({summary:'enter your details'})
  @ApiBody({
    schema:{
      type: 'object',
      properties:{
        username:{
          type:'string',
          example: 'chinese', 
        },
        email:{
          type:'string',
          example: 'i9-mkz', 
        },
        phone:{
          type:'string',
          example: 'i9-mkz', 
        },
        address:{
          type:'string',
          example: 'i9-mkz', 
        },
        password:{
          type:'string',
          example: 'i9-mkz', 
        },
        
      }
    }
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({summary:'get all your details'})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'get your details by id'})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary:'update your details'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({summary:'delete your details'})
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
