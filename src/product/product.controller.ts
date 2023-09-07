import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({summary:'enter your details'})
  @ApiBody({
    schema:{
      type: 'object',
      properties:{
        name:{
          type:'string',
          example: 'chinese', 
        },
        price:{
          type:'string',
          example: 'i9-mkz', 
        },
        quantity:{
          type:'string',
          example: 'i9-mkz', 
        },
        disscount:{
          type:'string',
          example: 'i9-mkz', 
        },
        
        
      }
    }
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({summary:'get all your details'})
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'get your details by id'})
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary:'update your details'})
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({summary:'delete your details'})
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
