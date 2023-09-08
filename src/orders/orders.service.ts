import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './Schema/order';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/product/Schema/product';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name)private orderModel :Model <OrderDocument>,
  @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
 

  

async findOrderHistoryForUser(): Promise<Order[]> {
 
  return this.orderModel.find().exec();
}


  create(createOrderDto: CreateOrderDto) :Promise <Order>{
    const model = new this.orderModel();
    model.productId=createOrderDto.productId;
    model.deliveryCost=createOrderDto.deliveryCost;
    model.total=createOrderDto.total;

    return model.save();
    
  }

  findAll() :Promise <Order[]>{
    return this.orderModel.find().exec();
  }

  findOne(id: string):Promise <Order> {
    return this.orderModel.findById(id).exec();
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.updateOne({_id:id},{
      productId:updateOrderDto.productId,
      deliveryCost:updateOrderDto.deliveryCost,
      total:updateOrderDto.total,
    });
  }

  remove(id: string) {
    return this.orderModel.deleteOne({_id:id});
  }
}


