import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  // @Post('/:orderId/add-product/:productId')
  // async addProductToOrder(
  //   @Param('orderId') orderId: string,
   
  // ) {
  //   return this.ordersService.addProductToOrder(orderId, productId);
  // }
  @Post()
  @ApiOperation({summary:'enter your details'})
  @ApiBody({
    schema:{
      type: 'object',
      properties:{
        productId:{
          type:'string',
          example: 'chinese', 
        },
       
        deliceryCost:{
          type:'string',
          example: 'i9-mkz', 
        }, 
        total:{
          type:'string',
          example: 'i9-mkz', 
        },
       
        
      }
    }
  })
  
  create(@Body() createOrderDto: CreateOrderDto, ) {
    
    return this.ordersService.create(createOrderDto);
  }
  @Get('history')
  async getOrderHistory(@Req() request: Request) {
    return this.ordersService.findOrderHistoryForUser(); // No need to pass a user ID
  }
  @Get()
  @ApiOperation({summary:'get all  your details'})
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'get your details by id'})
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary:'update your details'})
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({summary:'delete your details'})
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
