/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel}  from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { User } from '../../DB/Schemas/user.schema';
import bcrypt from 'bcrypt'
import { dbMethods } from '../../DB/dbMethods';
import { JwtService} from '@nestjs/jwt'
//UserModel
@Injectable()
export class UserService {

  constructor( 
    @InjectModel(User.name) private _userModel: Model<User>,
    private readonly _dbMethods: dbMethods,
    private _JwtService:JwtService
    ){}
  userGetService(){
    return "Hello from user module"
  }

  async sendDataService(req:any , res:any){
    const data = await this._userModel.create({
      name:"amira",
      email:"amira",
      password:"asiuru"
    })
    return res.status(200).json({message:"done",data})
  }


  async SignUpService (req:any , res:any){
    const { name , email , password , gender} = req.body
    // email check
    const isEmailExists = await this._userModel.findOne({email})
    console.log(isEmailExists);

    if(isEmailExists){
      // must be tho
      throw new BadRequestException('email is already exist')
    }
    // hashPassword
    const hashedPass = bcrypt.hashSync(password as string, 8 as number)

    const userObject = {
      name , email , password:hashedPass , gender
    }
    // DB Methods
    const user = await this._dbMethods.createDocument(this._userModel , userObject)
    if(!user){
      throw new BadRequestException('fail to add')
    }
    return res.status(201).json({message:"Done" , user})

  }

  async loginService(req:any, res:any){
    const { email , password } = req.body
    // email check
    const isEmailExists = await this._userModel.findOne({email})

    if(!isEmailExists){
      // must be tho
      throw new BadRequestException('in-valid login credentials')
    }
    // hashPassword
    const hashedPassMatch= bcrypt.compareSync(password  , isEmailExists['password'])

    if(!hashedPassMatch){
      // must be tho
      throw new BadRequestException('in-valid login credentials')
    }
    // token 
    const token = this._JwtService.sign({
      id:isEmailExists['_id'],
      email } , {
        secret:'loginKey'
      })

    return res.status(201).json({message:"Done" ,token })

  }


  async getUserDataService (req:any , res:any){
    return res.status(200).json({message:"done" , user:req.authUser})
  }
}
