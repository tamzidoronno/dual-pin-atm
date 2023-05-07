import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async register(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.account = await this.getTenDigitRandomInt();
    user.lowPin = createUserDto.lowPin;
    user.highPin = createUserDto.highPin;
    user.balance = createUserDto.balance;
    user.securityBalance = createUserDto.securityBalance;
    return this.userRepository.save(user);
  }
  async getUsers() {
    return await this.userRepository.find();
  }
  async getUserByAccount(account: string): Promise<User> {
    const user =  await this.userRepository.findOneBy({ account });
    if(!user) {
      throw new HttpException('Invalid card', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  async verifyPin(account: string, pin: number) {
    const user = await this.getUserByAccount(account);
    if (user.lowPin == pin) {
      return 'lowPin';
    }
    if (user.highPin == pin) {
      return 'highPin';
    }
    throw new HttpException('Invalid PIN', HttpStatus.BAD_REQUEST);
  }
  async withdraw(account: string, amount: number) {
    const user = await this.getUserByAccount(account);
    if (user.balance < amount) {
      throw new HttpException('Insufficient funds', HttpStatus.FORBIDDEN);
    }
    user.balance -= amount;
    user.securityBalance -= amount;
    return this.userRepository.save(user);
  }
  private async getTenDigitRandomInt() {
    const random = Math.floor(
      1000000000 + Math.random() * 9000000000,
    ).toString();
    const userExists = await this.getUserByAccount(random);
    if (userExists) {
      return this.getTenDigitRandomInt();
    }
    return random;
  }
}
