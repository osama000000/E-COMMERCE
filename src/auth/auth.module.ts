import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
// import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './jwtstrategy';
import { ConfigService } from '@nestjs/config';
import { UserSchema } from 'src/users/Schema/users';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[PassportModule.register({defaultStrategy: 'jwt'}), 
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory:(config:ConfigService)=>{
      return{
        secret: config.get<string>('JWT_SECRET'),
        signOptions:{  expiresIn: config.get<string | number>('JWT_EXPIRES')}
      }
    }
  }), 
  MongooseModule.forFeature([{name:'User', schema:UserSchema}]),UsersModule,
 ],
  controllers: [AuthController],
  providers: [AuthService,],
    // LocalStrategy,JwtStrategy,],
  exports:[AuthService]
})
export class AuthModule {}
