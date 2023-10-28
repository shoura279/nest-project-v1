/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DBModels } from '../../DB/models.generation'
import { dbMethods } from '../../DB/dbMethods';
import{JwtService} from '@nestjs/jwt'
@Module({
  imports:[DBModels],
  controllers:[UserController],
  providers:[UserService , dbMethods, JwtService]
})
export class UserModule {}
