import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './Schema/order';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/product/Schema/product';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name)private orderModel :Model <OrderDocument>,
 ){}



  create(createOrderDto: CreateOrderDto) :Promise <Order>{
    const model = new this.orderModel();
    model.items=createOrderDto.items;
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
      items:updateOrderDto.items,
      deliveryCost:updateOrderDto.deliveryCost,
      total:updateOrderDto.total,
    });
  }

  remove(id: string) {
    return this.orderModel.deleteOne({_id:id});
  }
}


// import { Injectable } from '@nestjs/common';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
// import { Order, OrderDocument } from './Schema/order';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Product } from 'src/product/Schema/product';

// @Injectable()
// export class OrdersService {
//   constructor(
//     @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
//     @InjectModel(Product.name) private productModel: Model<ProductDocument>,
//   ) {}

//   async create(createOrderDto: CreateOrderDto): Promise<Order> {
//     // Fetch products based on the provided ObjectId strings
//     const products = await this.productModel.find({
//       _id: { $in: createOrderDto.items },
//     });

//     // Calculate total price here using the logic mentioned in the previous answer.
//     const totalPrice = /* Calculate total price here */;

//     // Create an array of product IDs to store in the order
//     const productIds = products.map((product) => product._id);

//     const model = new this.orderModel({
//       items: productIds, // Assign the array of product IDs
//       deliveryCost: createOrderDto.deliveryCost,
//       total: totalPrice, // Assign the calculated total price
//     });

//     return model.save();
//   }

//   findAll(): Promise<Order[]> {
//     return this.orderModel.find().exec();
//   }

//   findOne(id: string): Promise<Order> {
//     return this.orderModel.findById(id).exec();
//   }

//   update(id: string, updateOrderDto: UpdateOrderDto) {
//     return this.orderModel.updateOne(
//       { _id: id },
//       {
//         items: updateOrderDto.items,
//         deliveryCost: updateOrderDto.deliveryCost,
//         total: updateOrderDto.total,
//       },
//     );
//   }

//   remove(id: string) {
//     return this.orderModel.deleteOne({ _id: id });
//   }
// }
