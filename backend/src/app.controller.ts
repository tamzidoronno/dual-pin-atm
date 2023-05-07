import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

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
  async getUser(@Param('account') account: string): Promise<User> {
    const user = await this.appService.getUserByAccount(account);
    if(!(user instanceof User)){
      throw new HttpException('Invalid Card', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  @Post('withdraw')
  withdraw(@Body() requestDto: { account: string; amount: number }) {
    return this.appService.withdraw(requestDto.account, requestDto.amount);
  }
}
