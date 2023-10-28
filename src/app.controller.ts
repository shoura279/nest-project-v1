/* eslint-disable prettier/prettier */
import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express'
@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) { }

  @Get()
  getHello(): string {
    return this._appService.getHello();
  }

  @Get('*')
  notFound(
    @Res() res: Response
  ): string {
    return this._appService.notFound(res);
  }
}