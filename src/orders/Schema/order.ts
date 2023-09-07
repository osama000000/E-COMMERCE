import { Prop,  SchemaFactory } from "@nestjs/mongoose";
import { Document , Schema as MongooseSchema} from "mongoose";
import { Product } from "src/product/Schema/product";
import {Schema} from '@nestjs/mongoose';

export type OrderDocument = Order & Document;
@Schema()
export class Order {


 
   
    items: string; // Reference to Product model
    @Prop()
    deliveryCost: string;
    @Prop()
    total:string;


}

export const OrderSchema = SchemaFactory.createForClass(Order)