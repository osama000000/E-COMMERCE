import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt';
export type UserDocument = User & Document;

@Schema()
export class User{

  @Prop()
  username:string;
  @Prop()
  email:string;
  @Prop()
  phone:string;
  @Prop()
  address:string;
  @Prop()
  password: string;
  @Prop()
  role:string;
  
  
}
export const UserSchema = SchemaFactory.createForClass(User)