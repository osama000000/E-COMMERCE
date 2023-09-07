import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/users/Schema/users";

import { UsersService } from "src/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    
    constructor(private readonly userService :UsersService){
        super();
    }

    validate(username: string, password:string):User{
        const user:User =this.userService.getUserByName(username);
        if(user === undefined) throw new UnauthorizedException();
        if(user != undefined && user.password == password){
            return user;
        }
        else{
            throw new UnauthorizedException();
        }
    }
}