import { IsEmail, IsNotEmpty, IsString, MinLength, } from'class-validator';


export class SignUpDto{
   @IsNotEmpty()
    @IsString()
    readonly username:string;

    @IsNotEmpty()
    @IsEmail({},{message:'please enter correct email'})
    readonly email:string;

    @IsNotEmpty()
    phone:string;

    @IsNotEmpty()
    @IsString()
    address:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password:string;

    @IsNotEmpty()
    role:string;

}

