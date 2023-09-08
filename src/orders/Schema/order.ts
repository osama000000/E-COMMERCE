import { Prop,  SchemaFactory } from "@nestjs/mongoose";
import { Document , Schema as MongooseSchema} from "mongoose";
import { Product } from "src/product/Schema/product";
import {Schema} from '@nestjs/mongoose';

export type OrderDocument = Order & Document;
@Schema()
export class Order {


    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })

   @Prop()
    productId: string[]; 
    @Prop()
    deliveryCost: string;
    @Prop()
    total:string;
    
    // @Prop({ type: String, required: true })
    // user: string; 
  
    @Prop({ type: Date, default: Date.now })
    orderDate: Date;

}

export const OrderSchema = SchemaFactory.createForClass(Order)