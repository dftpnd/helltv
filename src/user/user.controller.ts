import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';

import { PaymentDto } from './dto/payment.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('payment/:userId')
  @UsePipes(new ValidationPipe())
  async payment(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() PaymentDto: PaymentDto,
  ) {
    return this.userService.payment(userId, PaymentDto.amount);
  }
}
