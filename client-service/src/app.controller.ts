import { AuthService} from './Authen/auth.service';
import { Controller, Get,Post, Request,UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './Authen/local-auth.guard';



@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // post/login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  // get/protected
  // @UseGuards(JwtAuthGuard)
  // @Get('protected')
  // getHello(@Request() req): string {  
  //   return req.user;
  // }
   
}