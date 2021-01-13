import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("sms")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postSMS(@Body() body: any) {    
    if(body.Body.startsWith("ID")) {
      const id = body.Body.replace(/[^0-9]/g, "");
      return this.appService.getIPRSInformation(id);
    }
    return this.appService.getWelcomMessage();
  }
}
