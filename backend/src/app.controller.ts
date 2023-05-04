import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './create-user.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.appService.register(createUserDto);
  }
  @Get('user/:account')
  getUser(@Param('account') account: string) {
    return this.appService.getUserByAccount(account);
  }
  @Get('withdraw')
  withdraw(@Body() requestDto: { account: string; amount: number }) {
    return this.appService.withdraw(requestDto.account, requestDto.amount);
  }
}
