/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common"


@Injectable()
export class dbMethods {
  constructor(){}


  async createDocument (model:any , data:any){
    const document = await model.create(data)
    return document
  }
}