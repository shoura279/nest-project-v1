import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  notFound(res:any){
    return res.status(404).json({message:"fail"});

  }
}
