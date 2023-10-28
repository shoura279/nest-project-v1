/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { JwtService} from '@nestjs/jwt'
import { Model } from 'mongoose';
import { User } from '../../src/DB/Schemas/user.schema';
import {InjectModel} from '@nestjs/mongoose'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private _JwtService: JwtService ,@InjectModel(User.name) private _userModel: Model<User>){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<object>{
    const request = context.switchToHttp().getRequest();
    const {authorization} = request.headers
    if(!authorization){
      throw new BadRequestException('please login')
    }
    console.log(authorization);
    const decodedData  =  this._JwtService.verify(authorization , {
      secret:'loginKey'
    })
    if(!decodedData?.email){
      throw new BadRequestException('wrong token data')

    }
    const user = await this._userModel.findOne({email:decodedData.email})
    if(!user){
      throw new BadRequestException('please sginUp')
    }
    request['authUser'] = user
    return request
  }
}