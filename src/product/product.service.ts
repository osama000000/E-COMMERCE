import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './Schema/product';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name)private productModel : Model <ProductDocument>){}
  create(createProductDto: CreateProductDto):Promise <Product> {
    const model = new this.productModel();
    model.name=createProductDto.name;
    model.price=createProductDto.price;
    model.qunatity=createProductDto.qunatity;
    model.disscount=createProductDto.disscount;
    return model.save();
  }

  findAll() :Promise <Product[]>{
    return this.productModel.find().exec();
  }

  findOne(id: string):Promise <Product>{
    return this.productModel.findById(id).exec();
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.updateOne({_id:id},{
      name:updateProductDto.name,
      price:updateProductDto.price,
      quantity:updateProductDto.qunatity,
      disscount:updateProductDto.disscount,
    });
  }

  remove(id: string) {
    return this.productModel.deleteOne({_id:id});
  }
}
