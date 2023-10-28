/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get , Post, Query, Req, Res, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response}  from 'express'
import { AuthGuard } from '../../Guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService ) {}
  @Get()
  usetGet() {
    return this._userService.userGetService();
  }

  @Post()
  sendData(
    // @Body() body:object,
    // @Query() query:object,

    @Req() req:Request,
    @Res() res:Response,
  )
  {
    // console.log(req);
    // console.log(query);
    return this._userService.sendDataService(req,res)
  }

  @Post('signup')
  signUpHandler(
    @Req() req:Request,
    @Res() res:Response,
  ){
    return this._userService.SignUpService(req,res)
  }

  @Post('login')
  logInHandler(
    @Req() req:Request,
    @Res() res:Response,
  ){
    return this._userService.loginService(req,res)
  }

  @Get('data')
  // auth
  @UseGuards(AuthGuard)
  getUserDataHandler(
    @Req() req:Request,
    @Res() res:Response,
  ){
    return this._userService.getUserDataService(req,res)
  }
}
