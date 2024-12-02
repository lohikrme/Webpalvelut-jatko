import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAccessToken } from './auth/dto_and_strategies/jwt-access-token.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService : AuthService
  ) {}

  @Get()
  getHello(): string {
    console.log("Hello world!")
    return this.appService.getHello();
  }

  // AuthGuard calls localStrategy validate method automatically
  // which uses authService.validateUser to check if user is logged in
  // if user is logged in validly, the local validate method returns user
  // and AuthGuard adds the received user object into request
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<JwtAccessToken> {
    console.log('AuthGuard passed');
    console.log(JSON.stringify(req.body))
    const token = await this.authService.login(req.user);
    return token;
  }
}
