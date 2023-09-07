import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ProductDocument = Product&Document;
@Schema()
export class Product{
    @Prop()
    name:string;
    @Prop()
    price:string;
    @Prop()
    qunatity:string;
    @Prop()
    disscount:string
}

export const ProductSchema = SchemaFactory.createForClass(Product);