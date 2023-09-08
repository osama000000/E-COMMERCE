import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './Schema/order';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { Product, ProductSchema } from 'src/product/Schema/product';

@Module({
  imports:[MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]),
  
  MongooseModule.forFeature([{name: Product.name , schema:ProductSchema}]),
  Product],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
